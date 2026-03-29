import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL.'],
  },
  rating: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
