function formatAuthor(authorsArr) {
  let authorsStr = ''

  if (!authorsArr) {
    authorsStr = 'No author'
    return authorsStr
  }

  authorsArr.forEach((author, index) => {
    if (index !== (+authorsArr.length - 1)) {
      authorsStr += `${author}, `
    } else {
      authorsStr += `${author}`
    }
  })
  return authorsStr
}

function formatDescr(description) {
  if (!description) {
    return ''
  }

  const arrDescr = [...description.split(' ', 20)]
  return arrDescr.join(' ') + '...'
}

function formatPrice(priceObj) {
  let resPrice = ''
  if (!priceObj) {
    resPrice = ''
    return resPrice
  }

  if (priceObj.currencyCode === "RUB") {
    resPrice = `&#8381; ${priceObj.amount}`
  } else {
    resPrice = `${priceObj.amount} ${priceObj.currencyCode}`
  }

  return resPrice
}

function fomatAvRate(rateNum) {
  let resultStr = ''
  let maxStars = 5

  if (!rateNum) {
    return resultStr
  }

  // starTemplate //
  /*   `<svg width="12" height="11" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
  //     <defs>
  //       <mask id="half">
  //         <rect x="0" y="0" width="12" height="12" fill="white" />
  //         <rect x="0%" y="0" width="12" height="12" fill="red" /> 
  //       </mask>
  //     </defs>
  //     <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#F2C94C" mask="url(#half)"/>
  //   </svg>`
  */

  const copyNum = rateNum
  const intPartNum = Math.trunc(copyNum)
  const decPartNum = (copyNum - intPartNum).toFixed(2)
  const parcent = decPartNum * 100

  for (let i = intPartNum; i > 0; i--) {
    resultStr += `
    <svg width="12" height="11" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#F2C94C"/>
    </svg>`
  }
  if (intPartNum < maxStars) {
    resultStr += `
    <svg width="12" height="11" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="half">
          <rect x="0" y="0" width="12" height="12" fill="white" />
          <rect x="${parcent}%" y="0" width="12" height="12" fill="red" /> 
        </mask>
      </defs>
      <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#F2C94C" mask="url(#half)"/>
  </svg>`
  }
  if (intPartNum < (maxStars - 1)) {
    for (let i = ((maxStars - 1) - intPartNum); i > 0; i--) {
      resultStr += `
      <svg width="12" height="11" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/>
      </svg>`
    }
  }

  return resultStr
}

export { formatAuthor, formatDescr, formatPrice, fomatAvRate }