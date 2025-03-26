#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p client/public/images/case-studies

# Download the case study images
curl -o client/public/images/case-studies/saas-pricing-optimization.jpg "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
curl -o client/public/images/case-studies/saas-csat-improvement.jpg "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
curl -o client/public/images/case-studies/modernshop-ecommerce.jpg "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
curl -o client/public/images/case-studies/securepay-payment-app.jpg "https://images.unsplash.com/photo-1534670007418-bc50e48fe69e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
curl -o client/public/images/case-studies/quickbite-food-delivery.jpg "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
curl -o client/public/images/case-studies/connecthub-networking.jpg "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"

echo "Downloaded all images to client/public/images/case-studies/"