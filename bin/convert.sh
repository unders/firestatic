#!/usr/bin/env bash

compress_all() {
    images=$1

    imageOptim --directory ${images} --quit --verbose
}

main() {
    images=$1

    compress_all ${images}
    convert testdir/design_crop.jpg -quality 60 testdir/design_max.jpg
    convert testdir/design_crop.jpg -quality 60 testdir/design_max.webp

    convert testdir/design_crop.jpg -quality 60 -resize 50% testdir/design_medium.jpg
    convert testdir/design_crop.jpg -quality 60 -resize 50% testdir/design_medium.webp

    convert testdir/design_crop.jpg -quality 60 -resize 40% testdir/design_min.jpg
    convert testdir/design_crop.jpg -quality 60 -resize 40% testdir/design_min.webp

    compress_all ${images}
}

main testdir


# Images
#
### Original:
#   * hosting.jpg - w:h = 2037:1576
#   * design.jpg  - w:h = 3000:2000
#   * develop.jpg - w:h = 3000:2002
#
# Image Size:
#            300px:200px
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
