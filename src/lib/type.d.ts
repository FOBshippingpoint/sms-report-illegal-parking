export interface ReportData {
	address: string | null;
	policeDepartment: string | null;
	phoneNumber: string | null;
	situation: string | null;
	plateNumbers: string | null;
	vehicles: string | null;
	imageURLs: string | null;
	signature: string | null;
}

export interface CommonlyUsed {
	[key: string]: ReportData;
}
