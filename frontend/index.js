const addressContract = "0x5358f704F74BB29994d8bC6e7E798f30afcf8fcA";

const abi = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"uint256","name":"suply_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xdd62ed3e"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x095ea7b3"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x70a08231"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x313ce567"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x06fdde03"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x95d89b41"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x18160ddd"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0xa9059cbb"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x23b872dd"}];

let web3;
let account;
let MyCoin;

function init(){
    if(typeof window.ethereum!=='undefined'){
        const metamaskBtn=document.getElementById("enableEthereumButton");
        metamaskBtn.classList.remove('d-none');

        metamaskBtn.addEventListener('click',async()=>{
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            account = accounts[0];

            metamaskBtn.classList.add('d-none');
            document.getElementById('accountSelected').innerHTML= account;
            document.getElementById('accountSelected').classList.add("border");

            
            detectChangeAccount();
            contract();

            //document.getElementById('login').style.display = 'none';
            //document.getElementById('main').classList.remove('d-none');
        });
    }
}

function detectChangeAccount(){
    window.ethereum.on('accountsChanged',function(accounts){
        console.log(accounts)
        account = accounts[0];
        document.getElementById('accountSelected').innerHTML = account;
         
     });
 }

 function contract(){
     web3=new Web3(window.ethereum);
     MyCoin=new web3.eth.Contract(abi, addressContract);

     interact();
 }

 function interact() {
    const btnGetBalance=document.getElementById('btnGetBalance');
    btnGetBalance.addEventListener('click', () => {
        const address = document.getElementById('addressGetBalance');
        const value = address.value;
        console.log(MyCoin);
        MyCoin.methods.balanceOf(value).call().then(res => {
            const amount = web3.utils.fromWei(`${res}`,'ether');
            const valueSpan = document.getElementById('balance');
            valueSpan.innerHTML = amount;
        });
    });

    const transfer = document.getElementById('transferir');
    transfer.addEventListener('click',() => {
        const address=document.getElementById('addressBenefiaria');
        const addressValue=address.value;

        const amount=document.getElementById('cantidad');
        const amountString=amount.value.toString();
        const amountTransfer=web3.utils.toWei(amountString,'ether');

        MyCoin.methods.transfer(addressValue,amountTransfer).send({from:account}).then(res=>{
        address.value='';
        amount.value=0;
        
        });
    });
 }

 window.onload = init();