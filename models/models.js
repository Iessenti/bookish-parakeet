import sequelize from '../db.js'
import {DataTypes} from 'sequelize'

// описание моделей данных

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'CUSTOMER'},
    name: {type: DataTypes.STRING}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.FLOAT, defaultValue: 0},
    photolink: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    ratin: {type: DataTypes.FLOAT, defaultValue: 0}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false},
    summary_price: {type: DataTypes.FLOAT, defaultValue: 0},
    status: {type: DataTypes.STRING, defaultValue: 'Создан'},
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    comment: {type: DataTypes.STRING, allowNull: true},
})

const CategoryProduct = sequelize.define('category_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const BrandProduct = sequelize.define('brand_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const InfoProduct = sequelize.define('info_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    desc: {type: DataTypes.STRING, allowNull: false},
})
// дополнительная модель для реализации связи между категорией и брендом "многие ко многим"
const BrandCategory = sequelize.define('brand_category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// описание связей между моделями с указаниями foreign_key
    // у одного пользователя может быть только одна корзина - текущая
    User.hasOne(Basket, {
        foreignKey: 'user_id'
    })
    Basket.belongsTo(User)

    // в одной корзине может быть много продуктов
    Basket.hasMany(BasketProduct, {
        foreignKey: 'basket_id'
    })
    BasketProduct.belongsTo(Basket)

    // один продукт может быть в нескольких корзинах, то есть его связь к BasketProduct - один ко многим
    Product.hasMany(BasketProduct, {
        foreignKey: 'product_id'
    })
    BasketProduct.belongsTo(Product)

    // У одного пользователя может быть несколько заказов. Связь - один ко многим
    User.hasMany(Order, {
        foreignKey: 'user_id'
    })
    Order.belongsTo(User)

    // В одном заказе может быть несколько продуктов. связь - один ко многим
    Order.hasMany(OrderProduct, {
        foreignKey: 'order_id'
    })
    OrderProduct.belongsTo(Order)

    // Один продукт может быть в нескольких заказах. Связь - один ко многим
    Product.hasMany(OrderProduct, {
        foreignKey: 'product_id'
    })
    OrderProduct.belongsTo(Product)

    // Один продукт может иметь несколько характеристик
    Product.hasMany(InfoProduct, {
        foreignKey: 'product_id'
    })
    InfoProduct.belongsTo(Product)

    // У одного продукта может быть несколько оценок
    Product.hasMany(Rating, {
        foreignKey: 'product_id'
    })
    Rating.belongsTo(Product)

    // У одного пользователя может быть несколько оценок для разных продуктов
    User.hasMany(Rating, {
        foreignKey: 'user_id'
    })
    Rating.belongsTo(User)

    // у одного продавца User с role="seller" может быть несколько выложенных продуктов
    User.hasMany(Product, {
        foreignKey: 'seller'
    })
    Product.belongsTo(User)

    // Продукт может принадлежать одной категории или бренду, но в категории или бренде может быть много продуктов
    BrandProduct.hasMany(Product, {
        foreignKey: 'brand_id'
    })
    Product.belongsTo(BrandProduct)

    CategoryProduct.hasMany(Product, {
        foreignKey: 'category_id'
    })
    Product.belongsTo(CategoryProduct)


    // Связь "многие ко многим" для брендов и категорий. Так как один бренд может выпускать большое количество видов продукции, 
        // а в одной категории может быть представлена продукция разных брендов
    BrandProduct.belongsToMany(CategoryProduct, {through: BrandCategory})
    CategoryProduct.belongsToMany(BrandProduct, {through: BrandCategory})


// экспорт всех моделей
export {
    User,
    Product,
    Basket,
    BasketProduct,
    BrandCategory,
    BrandProduct,
    CategoryProduct,
    InfoProduct,
    Rating,
    Order,
    OrderProduct
}