import 'package:deep_linking/models/product_model.dart';
import 'package:deep_linking/screens/products_screen.dart';
import 'package:flutter/material.dart';

class ProductDetailScreen extends StatelessWidget {
  const ProductDetailScreen({super.key, required this.productId});
  final int productId;
  @override
  Widget build(BuildContext context) {
    Product product;
    try {
      product = globalProducts.firstWhere((element) => element.id == productId);
    } catch (err) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Details'),
        ),
        body: const Center(
          child: Text('Ha ocurrido un error!'),
        ),
      );
    }
    final Product(:name, :price) = product;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Details'),
      ),
      body: Center(
        child: Text('El producto es $name con precio $price'),
      ),
    );
  }
}
