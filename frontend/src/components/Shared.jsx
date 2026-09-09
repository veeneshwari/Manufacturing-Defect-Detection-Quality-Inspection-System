import { fmtDateTime } from '../utils/format';

export function StatusPill({ status }) {
  return status === 'pass' ? (
    <span className="pill pill-pass">✓ PASS</span>
  ) : (
    <span className="pill pill-fail">✗ FAIL</span>
  );
}

const SEVERITY_MAP = { Critical: 'pill-critical', High: 'pill-high', Medium: 'pill-medium', Low: 'pill-low' };
export function SeverityPill({ level }) {
  return <span className={`pill ${SEVERITY_MAP[level] || 'pill-neutral'}`}>{level}</span>;
}

const LINE_STATUS_MAP = { 'Attention Needed': 'pill-critical', Monitor: 'pill-medium', Healthy: 'pill-low' };
export function LineStatusPill({ status }) {
  return <span className={`pill ${LINE_STATUS_MAP[status] || 'pill-neutral'}`}>{status}</span>;
}

export function Skeleton({ h = 90 }) {
  return <div className="skeleton" style={{ height: h, marginBottom: 12 }}></div>;
}

export function ErrorBanner({ message }) {
  return <div className="alert-error">{message}</div>;
}

// Icon defaults to context — pass one of 'upload' | 'search' | 'report' | 'trend' | 'inbox',
// or any custom character/emoji for a one-off case.
const EMPTY_ICONS = {
  upload: '⇪',
  search: '◎',
  report: '▤',
  trend: '∿',
  inbox: '□',
};

export function EmptyState({ title, subtitle, icon = 'inbox' }) {
  const glyph = EMPTY_ICONS[icon] || icon;
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">{glyph}</div>
      <div className="empty-state-title">{title}</div>
      {subtitle ? <div className="empty-state-subtitle">{subtitle}</div> : null}
    </div>
  );
}

export function KpiCard({ label, value, suffix = '', accent }) {
  return (
    <div className="kpi-card">
      <div className="kpi-value" style={accent ? { color: accent } : undefined}>
        {value}
        {suffix}
      </div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

// Wrap a row of <KpiCard> elements in this to get the one-time scan-sweep
// animation across the row on page load. Use like:
//   <KpiRow><KpiCard .../><KpiCard .../></KpiRow>
export function KpiRow({ children, columns = 4 }) {
  return (
    <div
      className="kpi-row"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

export function InspectionsTable({ rows }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Code</th>
          <th>Line</th>
          <th>Defect</th>
          <th>Status</th>
          <th>Severity</th>
          <th>Confidence</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td>{r.product.product_name}</td>
            <td className="font-mono" style={{ color: 'var(--text-muted)', fontSize: 12.5 }}>
              {r.product.product_code}
            </td>
            <td>{r.product.production_line || '—'}</td>
            <td>{r.defect_type}</td>
            <td>
              <StatusPill status={r.status} />
            </td>
            <td>
              <SeverityPill level={r.severity_level} />{' '}
              <span className="font-mono" style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                {r.severity_score}
              </span>
            </td>
            <td className="font-mono" style={{ fontSize: 12.5 }}>
              {r.scores.confidence}%
            </td>
            <td style={{ color: 'var(--text-muted)', fontSize: 12.5, whiteSpace: 'nowrap' }}>
              {fmtDateTime(r.created_at)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ProductionLinesTable({ lines }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Production Line</th>
          <th>Inspected</th>
          <th>Passed</th>
          <th>Defects</th>
          <th>Yield</th>
          <th>Avg Severity</th>
          <th>Status</th>
          <th>Last Inspection</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((l) => (
          <tr key={l.production_line}>
            <td style={{ fontWeight: 600 }}>{l.production_line}</td>
            <td>{l.total_inspected}</td>
            <td style={{ color: 'var(--low)' }}>{l.passed}</td>
            <td style={{ color: l.defects ? 'var(--critical)' : 'var(--text-muted)' }}>{l.defects}</td>
            <td className="font-mono">{l.yield_percent}%</td>
            <td className="font-mono">{l.avg_severity}</td>
            <td>
              <LineStatusPill status={l.status} />
            </td>
            <td style={{ color: 'var(--text-muted)', fontSize: 12.5 }}>{fmtDateTime(l.last_inspection)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
