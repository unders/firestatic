#!/usr/bin/env bash

compress_all() {
    images=$1

    imageOptim --directory ${images} --quit --verbose
}

main() {
    dir=$1

    convert ${dir}/design_crop.jpg -quality 60 -resize 13% ${dir}/design_max.jpg
    convert ${dir}/design_crop.jpg -quality 60 -resize 13% ${dir}/design_max.webp

    convert ${dir}/hosting_crop.jpg -quality 60 -resize 20% ${dir}/hosting_max.jpg
    convert ${dir}/hosting_crop.jpg -quality 60 -resize 20% ${dir}/hosting_max.webp

    convert ${dir}/develop_crop.jpg -quality 60 -resize 22% ${dir}/develop_max.jpg
    convert ${dir}/develop_crop.jpg -quality 60 -resize 22% ${dir}/develop_max.webp

    compress_all ${dir}
}

main project/base/assets/image


# Images
#
### Original:
#   * hosting.jpg - w:h = 2037:1576
#   * design.jpg  - w:h = 3000:2000
#   * develop.jpg - w:h = 3000:2002
#
# Image Size:
#            213px:142px
#            310px:205px
#            365px:243px
#            650px:433px (develop)
#
### Crop (ratio 1.5):
#   * hosting_crop.jpg - w:h = 2000:1333
#   * design_crop.jpg  - w:h = 3000:2000
#   * develop_crop.jpg - w:h = 3000:2000
#
### Max:
#   * hosting.jpg - w:h =
#   * design.jpg  - w:h =
#   * develop.jpg - w:h =
#
### Medium:
#   * hosting.jpg - w:h =
#   * design.jpg  - w:h =
#   * develop.jpg - w:h =
#
### Min:
#   * hosting.jpg - w:h =
#   * design.jpg  - w:h =
#   * develop.jpg - w:h =
#
### Thumb:
#   * hosting.jpg - w:h = 64:64
#   * design.jpg  - w:h = 64:64
#   * develop.jpg - w:h = 64:64
