import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([
    {
      id: 1,
      name: 'Angular T-Shirt',
      price: 25,
      quantity: 1,
      image: 'https://picsum.photos/50?1'
    },
    {
      id: 2,
      name: 'Bootstrap Mug',
      price: 15,
      quantity: 2,
      image: 'https://picsum.photos/50?2'
    }
  ]);

  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity * item.price, 0)
  );

  increase(item: CartItem) {
    item.quantity++;
    this.cartItems.update(items => [...items]);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartItems.update(items => [...items]);
    }
  }

  remove(item: CartItem) {
    this.cartItems.update(items =>
      items.filter(i => i.id !== item.id)
    );
  }
}
