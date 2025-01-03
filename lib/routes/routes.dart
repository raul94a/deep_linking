import 'package:deep_linking/screens/details.dart';
import 'package:deep_linking/screens/home_screen.dart';
import 'package:deep_linking/screens/products_screen.dart';
import 'package:flutter/material.dart';

final appRoutes = {
  '/': (context) => const HomeScreen(),
  '/Products': (context) => const ProductsScreen(),
  '/Products/Details': (context) {
    final productId = ModalRoute.of(context)!.settings.arguments as int;
    return ProductDetailScreen(productId: productId,);
  },
};
