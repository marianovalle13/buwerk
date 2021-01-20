import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dt'
})
export class DtPipe implements PipeTransform {

  transform(value: any, format: any): any {
    var date = new Date(value);
    var d = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
    var hour = '' + d.getHours();
    var min = '' + d.getMinutes();
    var sec = '' + d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (min.length < 2) min = '0' + min;
    if (sec.length < 2) sec = '0' + sec;

    var dateRet = [day, month, year ].join('/');

    if(format.includes("hh:mm:ss")){
        var time = [hour, min, sec ].join(':');
        dateRet += " " + time;
    } else if(format.includes("hh:mm")){
      var time = [hour, min ].join(':');
      dateRet += " " + time;
    }

    return dateRet;

  }


}
