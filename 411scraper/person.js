
function Person (name, phone, address){
    this.name = name;
    this.phone = phone;
    this.address = address;
}

Person.prototype.get_name = function(){
    return this.name;
}

Person.prototype.toString = function(){
    return this.name+"\n"+this.phone+"     "+this.address+"\n";
}
