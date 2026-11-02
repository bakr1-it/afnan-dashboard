import { Country } from "country-state-city";
let listCountryWithIso : Record<string,string>={};
Country.getAllCountries().forEach((c)=> listCountryWithIso[c.isoCode] = c.flag + ' ' + c.name);
export { listCountryWithIso};  