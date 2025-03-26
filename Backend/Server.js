const express = require('express');
const ConnectDB = require('./config/Db');
const UserRoutes = require('./routes/User.routes');
const cors = require('cors');
const ProductRoutes = require('./routes/Product.routes');
const SellerRoutes = require('./routes/Seller.routes');
const CartRoutes = require('./routes/Cart.routes');
const OrderRoutes = require('./routes/Order.routes');

require('dotenv').config();


const Port = process.env.PORT || 4002;


//connecting database
ConnectDB();
const app = express();
//middleware


app.use(cors());
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routes
app.use('/api/user', UserRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/seller', SellerRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/orders', OrderRoutes);


app.listen(Port, () => console.log(`server is running on port http://localhost:${Port}`));

