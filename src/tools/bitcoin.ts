
import '../../shim';
const bitcoin = require('bitcoinjs-lib');

export default class BitcoinGenerate {

  public generateNewAddress() {
    const keyPair = bitcoin.ECPair.makeRandom();

    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    const secret = keyPair.toWIF();

    return {
      publicKey: address,
      privateKey: secret,
    };
  }

  public importWallet(secret) {
    const keyPair = bitcoin.ECPair.fromWIF(secret);
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

    return {
      publicKey: address,
      privateKey: secret,
    };
  }

  public getQRCode(address) {
    const uri = `https://blockchain.info/qr?data=${address}`;

    return uri;
  }

  public satoshiToBtc(value: number): number {
    return value * 0.00000001;
  }

  async getBalance(address: string) {
    const uri = `https://blockchain.info/rawaddr/${address}`;
    const response = await fetch(uri);
    const responseJson = await response.json();
    const transactions = responseJson && responseJson.txs
      responseJson.txs.map((tx) => ({ ...tx, value: this.satoshiToBtc(tx.result), unit: 'BTC' }));

    return {
      value: this.satoshiToBtc(responseJson.final_balance),
      unit: 'BTC',
      transactions,
    }
  }

  // Convert valueto selected currency
  // @param value in mBTC
  // @param currency USD, JPY, CNY, SGD, HKD, CAD, NZD, AUD, CLP, GBP, DKK,SEK, ISK, CHF, BRL, EUR, RUB, PLN, THB, KRW, TWD
  async convertBTC(value: number, currency: string = 'USD') {
    const uri = `https://blockchain.info/tobtc?currency=${currency}&value=${value}`;
    const response = await fetch(uri);
console.log(response);
    return response;
  }
}
