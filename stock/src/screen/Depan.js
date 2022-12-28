import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { style } from './Style'

class Depan extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nama_barang:'',
        jenis_barang:'',
        jmlh_barang:'',
        listData:[],
        idEdit:null,
    };
    this.url = "http://192.168.138.244/api/api.php";
  }
  componentDidMount(){
      this.ambilListData()
  }
  async ambilListData(){
    await fetch(this.url)
    .then((response)=>response.json())
    .then((json)=>{
        console.log('Hasil yang didapat: '+JSON.stringify(json.data.result));
        this.setState({listData:json.data.result});
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  klikSimpan(){
      if(this.state.nama_barang == '' || this.state.jenis_barang == '' || this.state.jmlh_barang == ''){
        alert('Silakan masukkan nama barang dan jenis barang dan jumlah barang');
      }else{
          if(this.state.idEdit){
            var urlAksi = this.url+"/?op=update&id="+this.state.idEdit;
          }else{
            var urlAksi = this.url+"/?op=create";
          }
          

          fetch(urlAksi,{
              method:'post',
              headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
              },
              body:"nama_barang="+this.state.nama_barang+"&jenis_barang="+this.state.jenis_barang+"&jmlh_barang="+this.state.jmlh_barang
          })
          .then((response)=>response.json())
          .then((json)=>{
              this.setState({nama_barang:''});
              this.setState({jenis_barang:''});
              this.setState({jmlh_barang:''});
              this.ambilListData();
          })
      }
  }
  async klikEdit(id){
    await fetch(this.url+"/?op=detail&id="+id)
    .then((response)=>response.json())
    .then((json)=>{
        this.setState({nama_barang:json.data.result[0].nama_barang});
        this.setState({jenis_barang:json.data.result[0].jenis_barang});
        this.setState({jmlh_barang:json.data.result[0].jmlh_barang})
        this.setState({idEdit:id})
    })
  }
  async klikDelete(id){
    await fetch(this.url+"/?op=delete&id="+id)
    .then((response)=>response.json())
    .then((json)=>{
        alert('Data berhasil didelete');
        this.ambilListData();
    })
    .catch((error)=>{
        console.log(error)
    })
  }
  render() {
    return (
      <View style={style.viewWrapper}>
        <View style={style.viewData}>
            {
                this.state.listData.map((val,index)=>(
                    <View style={style.viewList} key={index}>
                        <Text style={style.textListnama_barang}>{val.nama_barang}</Text>
                        <Text style={style.textListjenis_barang}>{val.jenis_barang}</Text>
                        <Text style={style.textListjmlh_barang}>{val.jmlh_barang}</Text>
                        <Text style={style.textListEdit} onPress={()=>this.klikEdit(val.id)}>Edit</Text>
                        <Text style={style.textListDelete} onPress={()=>this.klikDelete(val.id)}>Delete</Text>
                    </View>
                ))
            }
        </View>
        <View style={style.viewForm}>
            <TextInput 
                style={style.textInput}
                placeholder="Masukkan Nama Barang"
                value={this.state.nama_barang}
                onChangeText={(text)=>this.setState({nama_barang:text})}
                >
            </TextInput>
            <TextInput
                style={style.textInput}
                placeholder="Masukkan Jenis Barang"
                value={this.state.jenis_barang}
                onChangeText={(text)=>this.setState({jenis_barang:text})} >
                </TextInput>
              <TextInput
                style={style.textInput}
                placeholder="Masukkan Jumlah Barang"
                value={this.state.jmlh_barang}
                onChangeText={(text)=>this.setState({jmlh_barang:text})}> 
            </TextInput>
            <Button 
            title="Masukkan Data"
            onPress={()=>this.klikSimpan()}>
            </Button>
        </View>
      </View>
    );
  }
}

export default Depan;