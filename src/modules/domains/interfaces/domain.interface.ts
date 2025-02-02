export type DomainStatus = 'pending' | 'verified' | 'failed';
export type DomainRegion = 'us-east-1' | 'eu-west-1' | 'sa-east-1';

export interface DomainSpfRecord {
  record: 'SPF';
  name: string;
  value: string;
  type: 'MX' | 'TXT';
  ttl: string;
  status: DomainStatus;
  routing_policy?: string;
  priority?: number;
  proxy_status?: 'enable' | 'disable';
}

export interface DomainRecords {
  record: string;
  name: string;
  value: string;
  type: string;
  ttl: string;
  status: DomainStatus;
  routing_policy?: string;
  priority?: number;
  proxy_status?: 'enable' | 'disable';
}

export interface DomainNameservers {
  nameservers: string[];
}

export interface Domain {
  id: string;
  name: string;
  status: DomainStatus;
  created_at: string;
  region: DomainRegion;
}
