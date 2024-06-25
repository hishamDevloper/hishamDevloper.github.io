var file;
document.getElementById('input-excel').addEventListener('change', function (event) {
    file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume we're interested in the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Display JSON in HTML Table
        const table = document.getElementById('excel-table');
        table.innerHTML = '';
        json.forEach((row) => {
            const tr = document.createElement('tr');
            row.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        LoadInSelect();
    };

    reader.readAsArrayBuffer(file);
});

var DataTable = document.getElementById("excel-table");
var Name = document.getElementById("Name"); //select Name
var Latitude = document.getElementById("Latitude"); //select 27
var Longitude = document.getElementById("Longitude"); //select 30
var ButtonKML = document.getElementById("ButtonKML");
var ButtonKMZ = document.getElementById("ButtonKMZ");
var ButtonRefresh = document.getElementById("ButtonRefresh");

function LoadInSelect() {
    var ExcelTable = DataTable.rows[0].cells;

    for (var i = 0; i < ExcelTable.length; i++) {
        var OptionName = document.createElement('option');
        OptionName.value = ExcelTable[i].innerHTML;
        OptionName.innerText = ExcelTable[i].innerHTML;
        Name.appendChild(OptionName);

        var OptionLatitude = document.createElement('option');
        OptionLatitude.value = ExcelTable[i].innerHTML;
        OptionLatitude.innerText = ExcelTable[i].innerHTML;
        Latitude.appendChild(OptionLatitude);

        var OptionLongitude = document.createElement('option');
        OptionLongitude.value = ExcelTable[i].innerHTML;
        OptionLongitude.innerText = ExcelTable[i].innerHTML;
        Longitude.appendChild(OptionLongitude);
    }
    ButtonKML.removeAttribute("disabled");
    ButtonKMZ.removeAttribute("disabled");
}

function Export() {
    var firstRow = DataTable.rows[0].cells;
    var file2 = file.name.split('.')[0];
    var Data = "";
    Data =
        `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>${file2}</name>
	<Schema name="${file2}" id="S_test_SSS">
		<SimpleField type="string" name="${Name.value}"><displayName>&lt;b&gt;${Name.value}&lt;/b&gt;</displayName>
</SimpleField>
		<SimpleField type="string" name="${Latitude.value}"><displayName>&lt;b&gt;${Latitude.value}&lt;/b&gt;</displayName>
</SimpleField>
		<SimpleField type="string" name="${Longitude.value}"><displayName>&lt;b&gt;${Longitude.value}&lt;/b&gt;</displayName>
</SimpleField>
	</Schema>
	<Style id="hlightPointStyle">
		<IconStyle>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png</href>
			</Icon>
		</IconStyle>
		<BalloonStyle>
			<text><![CDATA[<table border="0">
  <tr><td><b>${Name.value}</b></td><td>$[${file2}/${Name.value}]</td></tr>
  <tr><td><b>${Latitude.value}</b></td><td>$[${file2}/${Latitude.value}]</td></tr>
  <tr><td><b>${Longitude.value}</b></td><td>$[${file2}/${Longitude.value}]</td></tr>
</table>
]]></text>
		</BalloonStyle>
	</Style>
	<Style id="normPointStyle">
		<IconStyle>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href>
			</Icon>
		</IconStyle>
		<BalloonStyle>
			<text><![CDATA[<table border="0">
  <tr><td><b>${Name.value}</b></td><td>$[${file2}/${Name.value}]</td></tr>
  <tr><td><b>${Latitude.value}</b></td><td>$[${file2}/${Latitude.value}]</td></tr>
  <tr><td><b>${Longitude.value}</b></td><td>$[${file2}/${Longitude.value}]</td></tr>
</table>
]]></text>
		</BalloonStyle>
	</Style>
	<StyleMap id="pointStyleMap">
		<Pair>
			<key>normal</key>
			<styleUrl>#normPointStyle</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#hlightPointStyle</styleUrl>
		</Pair>
	</StyleMap>
	<Folder id="layer 0">
		<name>${file2}</name>`;

    var ColumnsName;
    var ColumnsLatitude;
    var ColumnsLongitude;
    for (var i = 0; i < firstRow.length; i++) {
        if (Name.value == firstRow[i].innerHTML) {
            ColumnsName = i;
        }
        else if (Latitude.value == firstRow[i].innerHTML) {
            ColumnsLatitude = i;
        }
        else if (Longitude.value == firstRow[i].innerHTML) {
            ColumnsLongitude = i;
        }
        else {
            continue;
        }
    }

    var newData = Data;
    for (var i = 1; i < DataTable.rows.length; i++) {
        var cells = DataTable.rows[i].cells;
        newData +=
            `
		<Placemark>
			<name>${cells[ColumnsName].textContent}</name>
			<styleUrl>#pointStyleMap</styleUrl>
			<Style id="inline">
				<IconStyle>
					<color>ffffffff</color>
					<colorMode>normal</colorMode>
					<Icon>
						<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
					</Icon>
				</IconStyle>
				<LineStyle>
					<color>ffffffff</color>
					<colorMode>normal</colorMode>
				</LineStyle>
				<PolyStyle>
					<color>ffffffff</color>
					<colorMode>normal</colorMode>
				</PolyStyle>
			</Style>
			<ExtendedData>
				<SchemaData schemaUrl="#S_test_SSS">
					<SimpleData name="${Name.value}">${cells[ColumnsName].textContent}</SimpleData>
					<SimpleData name="${Latitude.value}">${cells[ColumnsLatitude].textContent}</SimpleData>
					<SimpleData name="${Longitude.value}">${cells[ColumnsLongitude].textContent}</SimpleData>
				</SchemaData>
			</ExtendedData>
			<Point>
				<coordinates>${cells[ColumnsLongitude].textContent},${cells[ColumnsLatitude].textContent},0</coordinates>
			</Point>
		</Placemark>
		`
    }
    var newData2 = newData +
        `
	</Folder>
</Document>
</kml>
        `;

    return newData2;
}

ButtonKML.addEventListener("click", () => {
    if (Name.value != null && Latitude.value != null && Longitude.value != null) {
        var newData3 = Export();
        const blob = new Blob([newData3], { type: 'application/vnd.google-earth.kml+xml' });
        
        const anchor = document.createElement("a");
        anchor.download = file.name.split('.')[0] + ".kml"; 
        anchor.href = URL.createObjectURL(blob); 

        document.body.appendChild(anchor);
        anchor.click();

        document.body.removeChild(anchor);
        URL.revokeObjectURL(anchor.href);
    } else {
        alert("عليك تحديد جميع الاعمده الاسم وخط الطول وخط العرض");
    }
}
)

ButtonKMZ.addEventListener("click", () => {
    if (Name.value != null && Latitude.value != null && Longitude.value != null) {
        var newData3 = Export();
        const zip = new JSZip();
        zip.file('filename.kml', newData3);

        zip.generateAsync({ type: 'blob' })
            .then(blob => {
                // Use or download the KMZ blob
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = file.name.split('.')[0] + ".kmz";
                link.click();
            });
    } else {
        alert("عليك تحديد جميع الاعمده الاسم وخط الطول وخط العرض");
    }
})

ButtonRefresh.addEventListener("click", () => {
    location.reload();
})