#!/usr/bin/env bash

compress_all() {
    images=$1

    imageOptim --directory ${images} --quit --verbose
}

main() {
    dir=$1
    echo "no images to convert..."
#    convert ${dir}/design_crop.jpg -quality 60 -resize 13% ${dir}/design_max.jpg
#    convert ${dir}/design_crop.jpg -quality 60 -resize 13% ${dir}/design_max.webp
#    compress_all ${dir}
}

main project/functionbox/assets/image

