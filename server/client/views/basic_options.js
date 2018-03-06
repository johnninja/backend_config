const options = {
	tooltip : {
        trigger: 'axis',
        formatter: function(params){
            let format = '';
            let name = '';
            let dataIndex = 0;
            if (params instanceof Array) {
                params.forEach((item,index) => {
                    if (item.index >= dataIndex || name == '') {
                        name = item.name;
                    }
                });
                for (let i = 0; i < params.length; i++) {
                    let cur = params[i];
                    let data = (cur.name == '' || cur.name != name) ? '-' : cur.data;
                    format += ('<span style="display:inline-block;margin-right:5px;'
                    + 'border-radius:10px;width:9px;height:9px;background-color:'
                    + cur.color + ';'+'"></span>' + cur.seriesName + ':' + data + '<br />')
                }
            }
            
            return name ? name + '<br />' + format : format;
        }
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
                optionToContent: opt => {
                    let series = opt.series;
                    let axisData = opt.xAxis[0].data ? opt.xAxis[0].data : opt.yAxis[0].data;
                    let th = '', tbody = '';
                    axisData.forEach((d,i) => {
                        let body = '';
                        series.forEach(s => {
                            body += `<td>${s.data[i]}</td>`
                        });
                        tbody += `<tr>
                            <td>${d}</td>
                            ${body}
                        </tr>`
                    });
                    series.forEach(d => {
                        th += `<th>${d.name}</th>`
                    });
                    let table = `<table class="ui table celled" style="user-select: text">
                        <thead>
                            <tr>
                                <th>时间</th>
                                ${th}
                            </tr>
                        </thead>
                        <tbody>
                            ${tbody}
                        </tbody>
                    </table>`
                    return `<div style="max-height: 100%; overflow:auto">
                        ${table}
                    </div>`;
                },
                readOnly: true
            }
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '80',
        containLabel: true
    },
    color: ['#d87c7c','#919e8b', '#d7ab82',  '#6e7074','#61a0a8','#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'],
    backgroundColor: '#fff',
    graph: {
        color: ['#d87c7c','#919e8b', '#d7ab82',  '#6e7074','#61a0a8','#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b']
    },
    dataZoom: [
        {
            "show": true,
            "height": 30,
            "xAxisIndex": [
                0
            ],
            bottom: 30,
            "start": 0,
            "end": 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle:{color:"#d3dee5"},
            textStyle:{color:"#000"},
            borderColor:"#90979c"
        }
    ]
}
export default options;
