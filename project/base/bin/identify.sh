#!/usr/bin/env bash

# Shows type, dimensions, and size of the file
main() {
    imageDir=$1

    for file in $(find ${imageDir});
    do
        if [ -f "$file" ];then
            identify ${file}
        fi
    done
}

main project/base/assets/image
