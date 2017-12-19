const dme = {
	x: 55.410307,
	y: 37.902451
};

const app = document.querySelector('#content');

const createList = (data) => {
	let list = [];

	Object.keys(data).forEach(key => {
		item = data[key];
		const x = item[1];
		const y = item[2];

		if (Array.isArray(item)) {
			list.push({
				x,
				y,
				distance: Math.abs(Math.sqrt(Math.pow((dme.x - x), 2) + Math.pow((dme.y - y), 2))),
				from: item[11],
				to: item[12],
				test3: item[3],
				test4: item[4],
				test5: item[5],
				model: item[8],
				flight: item[16],
			});
		}
	});
	return list.sort((a, b) => a.distance - b.distance);
}

const renderItem = (item) => `
	<tr class="line">
		<td><span class="box yellow">${item.flight}</span></td>
		<td><span class="box">${item.from}</span></td>
		<td><span class="box">${item.to}</span></td>
		<td><span class="box">${item.x}</span></td>
		<td><span class="box">${item.y}</span></td>
		<td><span class="box number">${item.test3}</span></td>
		<td><span class="box number">${item.test4}</span></td>
		<td><span class="box number">${item.test5}</span></td>
	</tr>
`;

const renderList = (list) => list.map(renderItem).join('');

const render = (link, time) => {
	fetch(link)
	.then(response => response.json())
	.then((data) => {
		const list = createList(data);

		app.innerHTML = renderList(list);
		setTimeout(() => render(link, time), time);
	});
};

render('https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds= 56.20, 54.62, 35.90, 39.90', 2500)
