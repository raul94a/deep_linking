import 'dart:convert';

import 'package:deep_linking/models/product_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart';

// simplifaction, only for example
List<Product> globalProducts = [];

final getProductsProvider = FutureProvider<List<Product>>((ref) async {
  const ip = 'http://192.168.0.195';
  const port = '3000';
  const endpoint = '/products';
  print('CALLING => $ip:$port$endpoint');
  final response = await get(Uri.parse('$ip:$port$endpoint'));
  print('Response => ${response.body}');
  final responseBody =
      (jsonDecode(response.body) as List<dynamic>).cast<Map<String, dynamic>>();
  return responseBody.map(Product.fromMap).toList();
});

class ProductsScreen extends ConsumerWidget {
  const ProductsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final products = ref.watch(getProductsProvider);
    return switch (products) {
      AsyncError(:final error) => Scaffold(
          appBar: AppBar(
            title: const Text('Products Screen'),
          ),
          body: const Center(
            child: Text('ERROR!!!'),
          )),
      AsyncData(:final value) => Builder(builder: (context) {
          globalProducts = value;
          return Scaffold(
            appBar: AppBar(
              title: const Text('Products Screen'),
            ),
            body: ListView.builder(
              itemCount: value.length,
              itemBuilder: (ctx, i) {
                final product = value[i];
                return ListTile(
                  title: Text('Product ${product.name}'),
                  onTap: () {
                    Navigator.pushNamed(context, '/Products/Details',
                        arguments: product.id);
                  },
                );
              },
            ),
          );
        }),
      _ => const CircularProgressIndicator(),
    };
  }
}
