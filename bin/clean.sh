#!/usr/bin/env bash

main() {
    local source=$1
    local dest=websites

    rm -rf ${dest}
    mkdir ${dest}
    mkdir ${dest}/assets
    cp ${source}/favicon/* ${dest}/
    cp -R ${source}/assets/ ${dest}
    GOGC=off tmplgen -from=${source}/templates -to=${dest} all
}

main $@
