import { companyStats } from "../data/company";

export default function CompanyStats() {
  return <dl className="company-stats">{companyStats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>;
}
