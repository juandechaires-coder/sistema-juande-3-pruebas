(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.JuandeRecovery = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const KEY = 'sj3_beta1_investigations';
  const MODULES = ['Team Strength & Matchup','Market & Pricing','Live Market','First Quarter','Receiver','Player Performance','Running Back','Touchdown'];
  const SOURCES = ['GameRead','OraculoSports','Stake','Estadística oficial','Otra'];
  const FIELDS = ['id','event_date','sport','game','player','market','selection','line','odds','sportsbook','odds_checked_at','prob','prob_status','model_ref','grade','status','source_url','evidence_at','evidence','risks','reason','created_at','updated_at'];
  function readLocal(storage) {
    const raw = storage.getItem(KEY);
    let records;
    try { records = raw === null ? [] : JSON.parse(raw); }
    catch { throw Error('El Radar local contiene JSON inválido. No se modificó.'); }
    if (!Array.isArray(records) || !records.every(r => r && typeof r.id === 'string' && r.id)) {
      throw Error('El Radar local tiene un formato inesperado. No se modificó.');
    }
    return { raw, records };
  }
  function normalize(row, uid, now) {
    if (!row || row.user_id !== uid || !row.id || !Number.isInteger(row.version) || row.version < 1) return null;
    const payload = row.payload, r = payload && payload.radar_record;
    if (!payload || payload.schema !== 'sj3_beta1' || payload.kind !== 'research_only' || !r || r.is_bet === true) return null;
    if (typeof r.id !== 'string' || !r.id || r.id.length > 200 || row.source_id !== 'radar-beta5:' + r.id) return null;
    if (!['game','market','selection'].every(k => typeof r[k] === 'string' && r[k].trim())) return null;
    if (row.event_name !== r.game || row.market !== r.market) return null;
    if (!Array.isArray(r.sources) || !Array.isArray(r.modules) || ![...r.sources,...r.modules].every(x => typeof x === 'string')) return null;
    const clean = {};
    for (const k of FIELDS) {
      if (r[k] !== undefined && (typeof r[k] !== 'string' || r[k].length > 5000)) return null;
      clean[k] = r[k] || '';
    }
    if (clean.odds && (!Number.isFinite(Number(clean.odds)) || Number(clean.odds) <= 1)) return null;
    if (clean.prob && (!Number.isFinite(Number(clean.prob)) || Number(clean.prob) < 0 || Number(clean.prob) > 100)) return null;
    if (clean.line && !Number.isFinite(Number(clean.line))) return null;
    // An optional report is data, never authority to validate or promote a recovered record.
    if (r.analysis_report !== undefined) {
      if (typeof r.analysis_report !== 'string' || r.analysis_report.length > 200000) return null;
      try { const ar = JSON.parse(r.analysis_report); if (!ar || ar.version !== '1.0' || !ar.case || !ar.report) return null; }
      catch { return null; }
      clean.analysis_report = r.analysis_report;
    }
    clean.modules = r.modules.filter(x => MODULES.includes(x));
    clean.sources = r.sources.filter(x => SOURCES.includes(x));
    clean.status = 'En análisis';
    clean.grade = 'Sin calificar';
    clean.prob_status = 'sin_validar';
    clean.schema_version = 3;
    clean.is_bet = false;
    clean.updated_at = now;
    clean.cloud_origin = { user_id: uid, id: row.id, version: row.version, imported_at: now };
    return clean;
  }
  function plan(rows, records, uid, now) {
    if (!uid || !Array.isArray(rows) || !Array.isArray(records)) throw Error('No hay una consulta válida para revisar.');
    const ids = new Set(records.map(r => r.id));
    const result = { added: [], existing: 0, incompatible: 0, total: rows.length };
    for (const row of rows) {
      const r = normalize(row, uid, now);
      if (!r) { result.incompatible++; continue; }
      if (ids.has(r.id)) { result.existing++; continue; }
      ids.add(r.id);
      result.added.push(r);
    }
    return result;
  }
  function apply(storage, rows, uid, expectedRaw, now, nonce) {
    const local = readLocal(storage);
    if (local.raw !== expectedRaw) throw Error('El Radar cambió desde la vista previa. Pulsa Revisar de nuevo.');
    const preview = plan(rows, local.records, uid, now);
    if (!preview.added.length) return { ...preview, backupKey: null };
    const backupKey = 'sj3_cloud_backup:' + uid + ':' + nonce;
    if (!nonce || storage.getItem(backupKey) !== null) throw Error('No se pudo reservar una copia previa. Revisa de nuevo.');
    // Abort on backup or storage failure. Never change another localStorage key.
    storage.setItem(backupKey, JSON.stringify({ kind:'sj3-cloud-before-import', saved_at:now, user_id:uid, radar_raw:local.raw }));
    if (storage.getItem(KEY) !== local.raw) throw Error('El Radar cambió durante la operación. Revisa de nuevo.');
    const merged = JSON.stringify([...local.records, ...preview.added]);
    storage.setItem(KEY, merged);
    return { ...preview, backupKey };
  }
  return { KEY, readLocal, normalize, plan, apply };
});
