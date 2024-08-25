// Passing an array of `ImageData` will combine them and give the data url
export function downloadAsPng(imageDatas) {
    const canvas = new OffscreenCanvas(imageDatas[0].width, imageDatas[0].height)
    const ctx = canvas.getContext('2d')

    combineImageData(imageDatas[0], imageDatas.slice(1))

    ctx.putImageData(imageDatas[0], 0, 0)

    canvas.convertToBlob().then(blob => {
        const fileUrl = window.URL.createObjectURL(blob)
        const anchorElement = document.createElement('a')

        anchorElement.href = fileUrl
        anchorElement.download = 'playbook.png'
        anchorElement.style.display = 'none'

        document.body.appendChild(anchorElement)

        anchorElement.click()
        anchorElement.remove()

        window.URL.revokeObjectURL(fileUrl)
    })
}

function combineImageData(accumulator, imageDatas) {    
    for (const imageData of imageDatas) {
        for (let i = 0; i < imageData.data.length; i += 4) {
            const accR = accumulator.data[i]
            const accG = accumulator.data[i + 1]
            const accB = accumulator.data[i + 2]
            const accA = accumulator.data[i + 3]

            const imgR = imageData.data[i]
            const imgG = imageData.data[i + 1]
            const imgB = imageData.data[i + 2]
            const imgA = imageData.data[i + 3]

            // let a = (255 - accA) * imgA + accA
            // let r = ((255 - accA) * imgA * imgR + accA * accR) / a
            // let g = ((255 - accA) * imgA * imgG + accA * accG) / a
            // let b = ((255 - accA) * imgA * imgB + accA * accB) / a
            let a = (255 - imgA) * accA + imgA
            let r = ((255 - imgA) * accA * accR + imgA * imgR) / a
            let g = ((255 - imgA) * accA * accG + imgA * imgG) / a
            let b = ((255 - imgA) * accA * accB + imgA * imgB) / a

            accumulator.data[i] = r
            accumulator.data[i + 1] = g
            accumulator.data[i + 2] = b
            accumulator.data[i + 3] = a
        }
    }
}