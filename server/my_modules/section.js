module.exports = () => {
    let section = {}
    section.encode = function (section_name){
        switch(section_name){
            case 'ntut':
                return '002'
            case 'nmmst':
                return '003'
            case 'pmp':
                return '004'
            default:
                return section_name;
        }
    }
  
    section.decode = function (section_code){
        switch(section_code){
            case '002':
                return 'ntut'
            case '003':
                return 'nmmst'
            case '004':
                return 'pmp'
            default:
                return section_code
        }
    }
    return section
}

  