import _ from 'lodash';
import moment from 'moment';
import { TYPE_DATE, TYPE_CURRENCY } from './schema';

export function urlParam(obj) {
  return Object.keys(obj)
    .map(key => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e);
  }
}

export function formatKNumber(num) {
  if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
    return Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k'
  } else if (Math.abs(num) > 999999) {
    return Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'kk'
  }

  return Math.sign(num) * Math.abs(num);
}

export function exportCSV(header, rows, filename) {
  var link;
  let encodedUri;
  let csvContent = "data:text/csv;charset=utf-8,";
  let headerParsed = header.join(',');

  csvContent += headerParsed + "\r\n";

  rows.forEach((row) => {
    const rowParsed = _.values(row).join(',');
    csvContent += rowParsed + "\r\n";
  });

  encodedUri = encodeURI(csvContent);
  link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}_${moment().format('DD_MM_YYYY_HH_MM_SS')}.csv`);
  document.body.appendChild(link);
  link.click();
}

export const fieldParser = (value, type) => {
  if (type === TYPE_DATE) {
    return moment(value).format('DD/MM/YYYY');
  }

  if (type === TYPE_CURRENCY) {
    return `R$ ${formatMoney(value)}`;
  }

  return value;
}