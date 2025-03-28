import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.images?.length > 0 ? product.images[0].image : 'default-image.jpg'}
                    alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="rating">
                        {[...Array(5)].map((_, i) => {
                            const rating = Number(product.ratings) || 0;
                            if (i < Math.floor(rating)) {
                                return <i key={i} className="fas fa-star" style={{ color: 'gold', fontSize: '20px' }} />;
                            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                                return <i key={i} className="fas fa-star-half-alt" style={{ color: 'gold', fontSize: '20px' }} />;
                            } else {
                                return <i key={i} className="far fa-star" style={{ color: 'gold', fontSize: '20px' }} />;
                            }
                        })}
                        <span className="ml-2">({Number(product.ratings).toFixed(1)})</span>
                    </div>

                    <p className="card-text">${product.price} (per adult)</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    );
}
