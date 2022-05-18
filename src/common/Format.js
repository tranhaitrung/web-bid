import React from "react";

function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export {
    currencyFormat
}