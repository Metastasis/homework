const productsData = [
  {
    id: '1',
    categoryId: '1',
    category: 'Мобильные телефоны',
    brand: 'Samsung',
    model: 'a52',
    price: 10999, // rubles
    weight: 1300, // gram
    screenWidth: 1920, // px
    screenHeight: 1080, // px
    cameraFront: 5.2, // Megapixels
    cameraBack: 10 // Megapixels
  },
  {
    id: '2',
    categoryId: '1',
    category: 'Мобильные телефоны',
    brand: 'Samsung',
    model: 'a72',
    price: 15999, // rubles
    weight: 1100, // gram
    screenWidth: 2920, // px
    screenHeight: 2080, // px
    cameraBack: 12 // Megapixels
  },
  {
    id: '3',
    categoryId: '2',
    category: 'Компьютерные мышки',
    brand: 'a4tech',
    model: 'bloody g4',
    price: 1000, // rubles
    buttonsQty: 5,
  },
  {
    id: '4',
    categoryId: '0',
    category: 'Автомобиль',
    brand: 'Kia',
    model: 'Rio',
    price: 2500000 // rubles
  }
]

export function search() {
  return new Promise(resolve => setTimeout(() => {
    resolve(productsData)
  }, 1000))
}
