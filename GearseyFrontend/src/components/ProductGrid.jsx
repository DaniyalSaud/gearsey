import React from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from './ProductCard'

function ProductGrid() {
  const { state } = useAppContext()

  const filteredProducts = state.products.filter(product => {
    if (state.filters.show === 'fixed' && product.type !== 'fixed') return false
    if (state.filters.show === 'auctions' && product.type !== 'auction') return false
    if (state.filters.category !== 'all' && product.category.toLowerCase() !== state.filters.category) return false
    return true
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-50 hover:text-primary-600">
          {filteredProducts.length} Items Found
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>



      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-metallic-700 mb-2">No items found</h3>
          <p className="text-metallic-500">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  )
}

export default ProductGrid