import { type Product, type FilterOptions } from '../types';

class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      category: 'Electronics',
      description: 'Feature-rich smartwatch with health monitoring',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
    },
    {
      id: '3',
      name: 'Running Shoes',
      price: 129.99,
      category: 'Sports',
      description: 'Comfortable running shoes for all terrains',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
    },
    {
      id: '4',
      name: 'Coffee Maker',
      price: 89.99,
      category: 'Home',
      description: 'Premium coffee maker for perfect brews',
      image: 'https://images.pexels.com/photos/4226804/pexels-photo-4226804.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: false,
    },
    {
      id: '5',
      name: 'Laptop Backpack',
      price: 59.99,
      category: 'Accessories',
      description: 'Durable laptop backpack with multiple compartments',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
    },
    {
      id: '6',
      name: 'Bluetooth Speaker',
      price: 79.99,
      category: 'Electronics',
      description: 'Portable Bluetooth speaker with premium sound',
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
    },
    {
      id: '7',
      name: 'Yoga Mat',
      price: 34.99,
      category: 'Sports',
      description: 'Non-slip yoga mat for comfortable practice',
      image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
    },
    {
      id: '8',
      name: 'Kitchen Knife Set',
      price: 149.99,
      category: 'Home',
      description: 'Professional kitchen knife set with wooden block',
      image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
    },
  ];

  async getProducts(filters?: Partial<FilterOptions>): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredProducts = [...this.products];

    if (filters) {
      if (filters.category && filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(
          p => p.category.toLowerCase() === filters.category!.toLowerCase()
        );
      }

      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(
          p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower)
        );
      }
    }

    return filteredProducts;
  }

  async getProduct(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.products.find(p => p.id === id) || null;
  }

  getCategories(): string[] {
    return Array.from(new Set(this.products.map(p => p.category)));
  }
}

export const productService = new ProductService();
