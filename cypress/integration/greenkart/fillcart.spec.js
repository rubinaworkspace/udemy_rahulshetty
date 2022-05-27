/// <reference types="cypress" />

let vegeNamePriceJSONArray=[
        {vegeName:"Cauliflower", vegePrice: 60},
        {vegeName:"Carrot",vegePrice: 56},
        {vegeName:"Capsicum",vegePrice: 60},
        {vegeName:"Cashews",vegePrice: 650}]

describe('green cart Ca search test suite',()=>{
    
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('input.search-keyword').type('ca')
        cy.wait(2000)

    })

    it.only('verify Ca only veges appear when searching ca', ()=>{

       // let vegeNameArray = Object.keys(vegeNamePriceJSONArray).map(key => vegeNamePriceJSONArray[key].vegeName)
       let vegeNameArray = Object.values(vegeNamePriceJSONArray).map(value => value.vegeName)
        cy.log(vegeNameArray)
        cy.get('.products-wrapper .product').should('have.length',vegeNameArray.length)
        cy.get('.products-wrapper .product').find('h4').each(($vege)=>{
                     
            let vegeNameOnly = extractVegeName($vege);                          
            //expect(vegeNameOnly).to.be.oneOf(vegeNameArray)
            expect([$vege.text()]).to.contain.oneOf(vegeNameArray)
        })
    })

    it('confirm the price of each ca vege', ()=>{
        var recNamePriceList=[]
       
        
        cy.get('.products-wrapper .product').each(($vege)=>{
          
        var singleVegeNamePrice={}     

        let vegeNameOnly = extractVegeName($vege);                          
           
        let vegePrice= parseInt($vege.find('.product-price').text())
           
        singleVegeNamePrice.vegeName= vegeNameOnly
        singleVegeNamePrice.vegePrice=vegePrice
        recNamePriceList.push(singleVegeNamePrice)
           
           
        cy.log(vegePrice+ ":  "+ vegeNameOnly)

             
        }).wrap(recNamePriceList)
          .should('deep.equal', vegeNamePriceJSONArray).log(JSON.stringify(recNamePriceList))

          //why is this not working
        //cy.log(JSON.stringify(recNamePriceList))

     

        

    })
})

function extractVegeName($vegeElement){
    let vegeFullName= $vegeElement.find('.product-name').text()
    let endIndex= vegeFullName.indexOf(' ')
    if(endIndex==-1)
    endIndex= vegeFullName.length
    let vegeNameOnly= vegeFullName.substring(0,endIndex)
    return vegeNameOnly
}