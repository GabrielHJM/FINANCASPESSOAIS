export interface BankInfo {
  id: string;
  name: string;
  logo: string;
  color: string;
  textColor: string;
}

export const SUPPORTED_BANKS: BankInfo[] = [
  {
    id: "nubank",
    name: "Nubank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Logo_Nubank.svg",
    color: "#820ad1",
    textColor: "#ffffff"
  },
  {
    id: "inter",
    name: "Inter",
    logo: "https://logodownload.org/wp-content/uploads/2018/03/banco-inter-logo.png",
    color: "#ff7a00",
    textColor: "#ffffff"
  },
  {
    id: "bradesco",
    name: "Bradesco",
    logo: "https://logodownload.org/wp-content/uploads/2014/05/bradesco-logo-1.png",
    color: "#cc092f",
    textColor: "#ffffff"
  },
  {
    id: "itau",
    name: "Itaú",
    logo: "https://logodownload.org/wp-content/uploads/2014/05/itau-logo-0.png",
    color: "#ec7000",
    textColor: "#ffffff"
  },
  {
    id: "santander",
    name: "Santander",
    logo: "https://logodownload.org/wp-content/uploads/2014/05/santander-logo-1.png",
    color: "#ec0000",
    textColor: "#ffffff"
  },
  {
    id: "caixa",
    name: "Caixa",
    logo: "https://logodownload.org/wp-content/uploads/2014/02/caixa-logo-1.png",
    color: "#005ca9",
    textColor: "#ffffff"
  },
  {
    id: "picpay",
    name: "PicPay",
    logo: "https://logodownload.org/wp-content/uploads/2018/10/picpay-logo.png",
    color: "#21c25e",
    textColor: "#ffffff"
  }
];
