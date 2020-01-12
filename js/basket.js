const CloseModal = ()=>{
    document.getElementById('wrapper-modal').style.display = 'none';
};
document.addEventListener('DOMContentLoaded', () => {
    const
        btns = document.querySelectorAll('.btn'),
        modal = document.querySelector('.modal'),
        goodsCount = document.querySelector('#goods-count'),
        moneyCount = document.querySelector('#money-count');
    let goods = [],
        count = 0,
        price = 0;
    document.querySelector('#basket-modal').addEventListener('click', ()=>{
        let table = document.querySelector('.table');
        table.innerHTML = ``;
        if(!goods.length){
            table.innerHTML = `<h1 style="color: red;font-size: 30px;width: 100%; text-align: center">Нету товаров!</h1>`;
        }else{
            goods.forEach(elem=>{
                table.innerHTML += `
                <tr>
                    <td class="title-goods"><a href="#"><img src="${elem.img}" alt="crash">${elem.itemName}</a></td>
                    <td class="title-sum"><button class="plus">+</button><span class="title-price">${elem.count}</span><button class="minus">-</button></td>
                </tr>
            `;
            });
        }
        document.querySelector('.prise-inerr').textContent = price;
        document.querySelectorAll('.plus').forEach(elem=>{
            elem.addEventListener('click', (event)=>{
                let tr = event.target.closest('tr');
                count++;
                document.querySelector('.count-in').textContent = `${parseInt(document.querySelector('.count-in').textContent) + 1}`;
                goods.forEach(elem=>{
                    if(elem.itemName == tr.querySelector('.title-goods').textContent){
                        price = price + parseInt(elem.price);
                        elem.count++;
                    }
                });
                tr.querySelector('.title-price').textContent = `${parseInt(tr.querySelector('.title-price').textContent) + 1}`;
                goods.forEach(elem=>{
                    if(elem.itemName == tr.querySelector('.title-goods').textContent){
                        let prices = parseInt(document.querySelector('.prise-inerr').textContent) + elem.price;
                        document.querySelector('.prise-inerr').textContent = `${prices}`;
                        document.getElementById('money-count').textContent = `Сумма: ${prices} руб`;
                    }
                })
            })
        });
        document.querySelectorAll('.minus').forEach(elem=>{
            elem.addEventListener('click', (event)=>{
                let tr = event.target.closest('tr');
                if(parseInt(tr.querySelector('.title-price').textContent) > 1){
                    goods.forEach(elem=>{
                        if(elem.itemName == tr.querySelector('.title-goods').textContent)
                            elem.count--;
                    });
                    tr.querySelector('.title-price').textContent = `${parseInt(tr.querySelector('.title-price').textContent) - 1}`;
                    document.querySelector('.count-in').textContent = `${parseInt(document.querySelector('.count-in').textContent) - 1}`;
                    count--;
                    goods.forEach(elem=>{
                        if(elem.itemName == tr.querySelector('.title-goods').textContent){
                            let priceg = parseInt(document.querySelector('.prise-inerr').textContent) - elem.price;
                            price = price - parseInt(elem.price);
                            console.log(price);
                            document.querySelector('.prise-inerr').textContent = `${priceg}`;
                            document.getElementById('money-count').textContent = `Сумма: ${priceg} руб`;
                        }
                    })
                }
                else{
                    document.querySelector('.count-in').textContent = `${parseInt(document.querySelector('.count-in').textContent) - 1}`;
                    count--;
                    goods.forEach((elem, index)=>{
                        if(elem.itemName == tr.querySelector('.title-goods').textContent){
                            price = price - parseInt(elem.price);
                            if(elem.count > 1)
                                elem.count--;
                            let priceH = parseInt(document.querySelector('.prise-inerr').textContent) - elem.price;
                            if(priceH < 0) priceH = 0;
                            document.querySelector('.prise-inerr').textContent = `${priceH}`;
                            document.getElementById('money-count').textContent = `Сумма: ${priceH} руб`;
                            goods = goods.filter(elem=>{
                                if(elem.itemName == tr.querySelector('.title-goods').textContent){
                                    return false
                                }
                                else{
                                    return true
                                }
                            });
                        }
                    });
                    document.querySelector('.table').removeChild(tr);
                    if(!goods.length){
                        table.innerHTML = `<h1 style="color: red;font-size: 30px;width: 100%; text-align: center">Нету товаров!</h1>`;
                    }
                }
            })
        });
        document.getElementById('wrapper-modal').style.display = 'flex';
    });
    document.querySelector('.modal-wrapper').addEventListener('click', ()=>CloseModal());
    modal.querySelector('.close').addEventListener('click', ()=>CloseModal());
    modal.addEventListener('click', event=>event.stopPropagation());
    btns.forEach(element=>{
        element.addEventListener('click', event=>{
            count++;
            price += +event.target.closest('.good').querySelector('.price').dataset.price || 0;
            goodsCount.innerHTML = `Товаров: <span class="count-in">${count}</span> шт`;
            moneyCount.textContent = `Сумма: ${price} руб`;
            let good = event.target.closest('.good');
            let y = {
                img: good.querySelector('.img-item').src,
                itemName: good.querySelector('.title').textContent,
                count: 1,
                price: +good.querySelector('.price-in').textContent
            };
            if(!goods.length){
                goods.push(y);
            }else{
                for(let i = 0; i<goods.length; i++){
                    if(goods[i].itemName == y.itemName){
                        console.log(goods[i].itemName, y.itemName);
                        goods[i].count++;
                        break;
                    }else{
                        if(i == goods.length - 1){
                            goods.push(y);
                            break;
                        }
                    }
                }
            }
        })
    });
});