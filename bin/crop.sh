#!/usr/bin/env bash

toDimension() {
    dir=$1

    convert ${dir}/hosting.jpg -gravity Center -crop 2000x1333+0+0 +repage ${dir}/hosting_crop.jpg
    convert ${dir}/develop.jpg -gravity Center -crop 3000x2000+0+0 +repage ${dir}/develop_crop.jpg
    cp ${dir}/design.jpg ${dir}/design_crop.jpg
}

toThumb() {
    dir=$1

    convert ${dir}/hosting.jpg -gravity Center -crop 1000x1000+0+0 +repage ${dir}/hosting_square.jpg
    convert ${dir}/develop.jpg -gravity Center -crop 2000x2000+0+0 +repage ${dir}/develop_square.jpg
    convert ${dir}/design.jpg -gravity Center -crop 2000x2000+0+0 +repage ${dir}/design_square.jpg

    convert ${dir}/hosting_square.jpg -resize 64x64 ${dir}/hosting_thumb.jpg
    convert ${dir}/develop_square.jpg -resize 64x64 ${dir}/develop_thumb.jpg
    convert ${dir}/design_square.jpg  -resize 64x64 ${dir}/design_thumb.jpg
}

main() {
    dir=$1

    toDimension ${dir}
    toThumb ${dir}
}

main testdir

