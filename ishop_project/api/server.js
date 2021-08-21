const express = require('express'),
      bodyParser = require('body-parser'),
	  cors = require('cors'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  productsFile = 'products.json',
	  basketFile = 'basket.json',
	  ordersFile = 'orders.json';
      app = express();

//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(cors());

app.get('/api/products', (req, res) => {
	res.send(fs.readFileSync(productsFile, 'utf8'));
});

app.get('/api/products/:id', (req, res) => {
	const data = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
	var length=data.length;
	var page_count= Math.floor(length/2);
	if(length%2){
		page_count++;
	}
	var page=req.params.id;
	var prodIndexStart, prodIndexEnd;
	if(page!=page_count){
		prodIndexEnd=(page*2)-1;
		prodIndexStart=(page-1)*2;
	}
	else{
		prodIndexEnd=length-1;
		prodIndexStart=(page-1)*2;
	}

	var products = data.filter((product,index) => {
		if((index>=prodIndexStart) && (index<=prodIndexEnd)){
			return product;
		}
	});
	products.push(page_count);

	res.send(products);
});

app.get('/api/basket', (req, res) => {
	const data = JSON.parse(fs.readFileSync(basketFile, 'utf8'));
	let ObjMap ={};

	data.forEach(element => {
		var makeKey = element.prod_id;
		if(!ObjMap[makeKey]) {
			ObjMap[makeKey] = [];
		}

		ObjMap[makeKey].push(element);
	});

	let basketArr = [];

	for(key in ObjMap){
		rec = ObjMap[key][0];
		rec['count'] = ObjMap[key].length;
		basketArr.push(rec);
	}
	res.send(basketArr);
});

app.post('/api/basket/save', (req, res) => {
	var basketArr = req.body;

	fs.writeFileSync(ordersFile, JSON.stringify(basketArr));
	fs.writeFileSync(basketFile, JSON.stringify([]));

	res.sendStatus(204);
});

app.post('/api/basket/add', (req, res) => {
	const data = JSON.parse(fs.readFileSync(basketFile, 'utf8')),
	product = {};

	product.id = shortId.generate();
	product.prod_id = req.body.id;
	product.name = req.body.name;
	product.price = req.body.price;

	data.push(product);
	fs.writeFileSync(basketFile, JSON.stringify(data));

	res.send(product);
});

app.delete('/api/basket/clear', (req, res) => {
	fs.writeFileSync(basketFile, JSON.stringify([]));

	res.sendStatus(204);
});

app.get('/api/order', (req, res) => {
	res.send(fs.readFileSync(ordersFile, 'utf8'));
});

app.listen(3000, () =>  console.log('Server has been started...'));