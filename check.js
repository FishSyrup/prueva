class AddressCheck {
    constructor(opts = {}, language) {
        this.addressObj = opts
        this.language = language ? language : { postcode: {}, label: {}, tips: {} }
        this.addressTest = {
            // 地址正则校验
            reg: /^[a-zA-Z\s]+$/,
            reg_212: /[\@|\%|\&|\#|\*]+/,
            reg_en_num: /^[A-Za-z0-9]+$/,
            reg_en_num_space: /^[A-Za-z0-9\s]+$/,
            reg_en: /^[a-zA-Z0-9\|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?\s]*$/,
            reg_no_en: /[A-Za-z]{3}/,
            reg_num: /^[+-]?\d+\.?\d*$/,
            reg_num_all: /^[0-9\s]+$/,
            reg_cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            reg_cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
            reg_pobox_0: /^.*([bB][oO][xX]\s*\d).*$/i,
            reg_13: /^[A-Za-z0-9_@\-#,:\s\.\/\'º]*$/,
            reg_225: /^[A-Za-z0-9_@\-#,:\s\/\.\'º]*$/,
            reg_226: /^[A-Za-z0-9_@\-#,:\s\.\/]*$/,
            reg_137: /^[A-Za-z0-9_@\-#,:\s\.\/\'ºÁÉÍÓÚÑáéíóúñü]*$/,
            reg_name_137: /^[A-Za-z\sÁÉÍÓÚÑáéíóúñü]*$/,
            reg_name_209_en: /^[A-Za-z\s·\.●\-]{2,35}$/,
            reg_name_209_zh: /^[\u4e00-\u9fa5]{2,10}$/,
            reg_name_225: /^[A-Za-z0-9_@#\s]{2,30}$/,
            reg_name_en_space: /^[a-zA-Z\s]{2,30}$/,
            reg_name_85: /^[a-zA-Z0-9\s]{2,40}$/,
            reg_name_178: /^[a-zA-Z0-9\s]{2,100}$/,
            reg_tel: /^\d{5,30}$/,
            reg_tel_100: /^[1-9]\d{9}$/,
            reg_tel_209: /^09\d{8}$/,
            reg_tel_225: /^\d{5,16}$/,
            reg_tel_198: /^\d{5,13}$/,
            reg_tel_137: /^\d{5,25}$/,
            reg_tel_191: /^\d{5,20}$/,
            reg_tel_101: /^\d{9,12}$/,
            reg_tel_233: /^[0]\d{9,10}$/,
            reg_tel_212: /^\d{10}$/,
            reg_tel_th: /^0\d{9}$/,
            reg_tel_170: /^9\d{9}$/,
            reg_tel_206: /^07\d{8}$/,
            reg_tel_30: /^\d{10,11}$/,
            reg_tel_13: /^\d{9,10}$/,
            reg_tel_97: /^\d{8}$/,
            reg_tel_105: /^05\d{8}$/,
            reg_tel_224: /^5[0,2,4,5,6,8]\d{7}$/,
            reg_tel_186: /^5\d{8}$/,
            reg_tel_113: /^[9,5,6]\d{7}$/,
            reg_tel_175: /^(30|31|33|44|50|55|66|70|74|77)\d{6}$/,
            reg_tel_162: /^[7,9]\d{7}$/,
            reg_city_225: /^[\s\S]{2,28}$/,
            reg_nid_186: /^[1-2]\d{9}$/,
            reg_nid_109: /^\d{1,10}$/,
            reg_nid_175: /^[2-3]\d{10}$/,
            reg_tn_43: /^[A-Za-z0-9\-\.]{2,12}$/,
            reg_tn_197: /^P\d{12}$/,
            reg_number: /\d/,
            reg_num_3: /^\d{3}$/,
            reg_num_4: /^\d{4}$/,
            reg_english_name: /^[A-Z\s]*$/i,
            reg_chinese_character: /^[\u4e00-\u9fa5\sA-Z0-9，。,\.（）\(\)\/#\-]+$/i,
            // 限制位数数字正则
            create_reg_num (num) {
                return new RegExp(`^\\d{${num}}$`)
            },
            reg_postcode_jp: /^\d{3}-\d{4}$/,
            reg_single_quotes: /[\'\'\‘\’]/,
            reg_postcode_ie: /^[A-Za-z0-9]{3} [A-Za-z0-9]{4}$/,
            reg_postcode_lb: /^([0-9]{4} )?[0-9]{4}$/,
            reg_num_up_6: /\d{6,}/,
            reg_address1_ph: /(\'|\")/
        }
    }
    country() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId || ''
        if (!ctryid || ctryid == '0') {
            addressObj.error.country.value = this.language.label.select_country
            flag = false
        } else {
            const countryFlag = addressObj.countryList.concat(addressObj.commonList || []).some((item) => {
                return item.value == ctryid && item.isShield === '1'
            })
            if (countryFlag) {
                addressObj.error.country.value = ['174'].includes(ctryid) ? this.language.label.select_country_shield_pr : this.language.label.select_country_shield
                flag = false
            }
          }
        this._setAddressErrorValue('country', flag)
        return flag
    }
    fname() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId
        let val = addressObj.fname || ''
        if (ctryid == '209') {
            if (!this.addressTest.reg_name_209_en.test(val) && !this.addressTest.reg_name_209_zh.test(val)) {
                addressObj.error.fname.value = this.language.tips.fname_1_10
               // flag = false
            }
        } else if (ctryid == '13' || ctryid == '226') {
            if (!this.addressTest.reg_name_en_space.test(val)) {
                addressObj.error.fname.value = this.language.tips.fname_2_30
              //  flag = false
            }
        } else if (['38', '73'].includes(ctryid)) {
            if (val.length < 2 || val.length > 35) {
                addressObj.error.fname.value = this.language.tips.fname.replace('40', '35')
              //  flag = false
            }
        } else if (ctryid == '137') {
            if (!this.addressTest.reg_name_137.test(val) || val.length < 4 || val.length > 35) {
                addressObj.error.fname.value = this.language.tips.fname_4_35_mx
              //  flag = false
            }
        } else if (ctryid == '100') {
            // fullname
            if (val.length < 2 || val.length > 50) {
                addressObj.error.fname.value = this.language.tips.fname_4_35.replace('4', '2').replace('35', '50')
               // flag = false
            }
        } else if (ctryid == '212') {
            if (val.length < 2 || val.length > 40 || this.addressTest.reg_212.test(val)) {
                addressObj.error.fname.value = this.language.tips.fname_2_40_th
               // flag = false
            }
        } else if (ctryid == '97') {
            let valLength = addressObj.gblen(val)
            if (valLength < 1 || valLength > 30) {
                addressObj.error.fname.value = this.language.tips.fname.replace('40', '30').replace('2', '1')
              //  flag = false
            }
        } else if (ctryid == '82') {
            if (val.length < 2 || val.length > 30) {
                addressObj.error.fname.value = this.language.tips.fname.replace('40', '30')
              //  flag = false
            }
        } else if (ctryid == '225') {
            if (!this.addressTest.reg_name_225.test(val)) {
                addressObj.error.fname.value = this.language.tips.fname_2_30
             //   flag = false
            }
        } else if (ctryid == '85') {
            if (!this.addressTest.reg_name_85.test(val)) {
                addressObj.error.fname.value = this.language.tips.fname_2_40_gr
              //  flag = false
            }
        } else if (ctryid == '178') {
            if (val.length < 1 || val.length > 40) {
                addressObj.error.fname.value = this.language.tips.fname.replace('2', '1')
              //  flag = false 
            }
        } else if (['15', '47', '10', '166', '26', '216', '81', '40', '89', '24', '229', '235', '63', '69', '21', '107'].includes(ctryid)) {
            if (ctryid == '21') {
                if ((val.length < 2 || val.length > 35) || val.includes('&') || val.includes('#')) {
                    addressObj.error.fname.value = this.language.tips.fname_2_35_be
              //      flag = false 
                }
            } else {
                if ((val.length < 2 || val.length > 35) || val.includes('&')) {
                    addressObj.error.fname.value = this.language.tips.fname_2_35_special
               //     flag = false 
                }
            }
        } else if (ctryid == '191') {
            if ((val.length < 2 || val.length > 32) || this.addressTest.reg_single_quotes.test(val)) {
                addressObj.error.fname.value = this.language.tips.fname_2_32_sg
              //  flag = false 
            }
        } else if (['104', '172', '58', '14'].includes(ctryid)) {
            if (val.length < 2 || val.length > 35) {
                addressObj.error.fname.value = this.language.tips.fname.replace('40', '35')
              //  flag = false
            }
        } else if (val.length < 2 || val.length > 40) {
            addressObj.error.fname.value = this.language.tips.fname
          //  flag = false
        }
        addressObj.error.fname.show = !flag
        this._setAddressErrorValue('fname', flag)
        return flag
    }
    lname() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId
        let val = addressObj.lname || ''
        let fname = addressObj.fname || ''
        if (ctryid == '13' || ctryid == '226') {
            if (!this.addressTest.reg_name_en_space.test(val)) {
                addressObj.error.lname.value = this.language.tips.lname_2_30
                flag = false
            }
        } else if (ctryid == '212') {
            if (val.length < 2 || val.length > 40 || this.addressTest.reg_212.test(val)) {
                addressObj.error.lname.value = this.language.tips.lname_2_40_th
                flag = false
            }
        } else if (ctryid == '97') {
            let valLength = addressObj.gblen(val)
            if (valLength < 1 || valLength > 30) {
                addressObj.error.lname.value = this.language.tips.lname.replace('40', '30').replace('2', '1')
                flag = false
            }
        } else if (ctryid == '225') {
            if (!this.addressTest.reg_name_225.test(val)) {
                addressObj.error.lname.value = this.language.tips.lname_2_30
                flag = false
            }
        }  else if (['38', '73'].includes(ctryid)) {
            if (val.length + fname.length > 35) {
                addressObj.error.lname.value = this.language.tips.lname_exceed_35_ca
                flag = false
            } 
        } else if (ctryid == '137') {
            if (val.length + fname.length > 35 || !this.addressTest.reg_name_137.test(val)) {
                addressObj.error.lname.value = this.language.tips.lname_exceed_35_mx
                flag = false
            }    
        } else if (ctryid == '82') {
            if (val.length + fname.length > 30) {
                addressObj.error.lname.value = this.language.tips.lname_exceed_30_de
                flag = false
            }  
        } else if (ctryid == '178') {
            if (val.length < 1 || val.length > 40) {
                addressObj.error.lname.value = this.language.tips.lname.replace('2', '1')
                flag = false  
            }
        } else if (['15', '47', '10', '166', '26', '216', '81', '40', '89', '24', '229', '235', '63', '69', '21', '107'].includes(ctryid)) {
            if (ctryid == '21') {
              if ((val.length + fname.length) > 35 || val.includes('&') || val.includes('#')) {
                addressObj.error.lname.value = this.language.tips.lname_35_be
                flag = false  
              }
            } else {
              if ((val.length + fname.length) > 35 || val.includes('&')) {
                addressObj.error.lname.value = this.language.tips.lname_35_specail
                flag = false  
              }
            }
        } else if (ctryid == '191') {
            if ((val.length + fname.length) > 32 || this.addressTest.reg_single_quotes.test(val)) {
              addressObj.error.lname.value = this.language.tips.lname_32_sg
              flag = false  
            }
        } else if (['104', '172', '58', '14'].includes(ctryid)) {
            if ((val.length + fname.length) > 35) {
              addressObj.error.lname.value = this.language.tips.lname_exceed_35_ca
              flag = false  
            }
        } else if (['57', '98', '173', '161'].includes(ctryid)) {
            if ((val.length + fname.length) > 40) {
              addressObj.error.lname.value = this.language.tips.lname_exceed_40
              flag = false  
            }
        } else if (['85'].includes(ctryid)) {
            if ((val.length + fname.length) > 40 || (val.length && !this.addressTest.reg_en_num_space.test(val))) {
              addressObj.error.lname.value = this.language.tips.lname_exceed_40_gr
              flag = false  
            }
        } else if (val.length < 2 || val.length > 40) {
            addressObj.error.lname.value = this.language.tips.lname
            flag = false
        }
        this._setAddressErrorValue('lname', flag)
        return flag
    }
    fullName() {
        return this.fname()
    }
    middleName() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId
        let val = addressObj.middleName || ''
        if (ctryid == '186') {
            if (addressObj.operateType == 'supplement') {
                if (val.length < 2 || val.length > 40) {
                    flag = false
                }
            } else {
                if (val.length > 0 && (val.length < 2 || val.length > 40)) {
                    flag = false
                }
            }
            !flag && (addressObj.error.middleName.value = this.language.tips.middleName)
        }
        this._setAddressErrorValue('middleName', flag)
        return flag
    }
    fatherName() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId
        let val = addressObj.fatherName || ''
        if (ctryid == '178' && (val.length < 1 || val.length > 40)) {
            addressObj.error.fatherName.value = this.language.tips.fatherName.replace('2', '1')
            flag = false
        }
        this._setAddressErrorValue('fatherName', flag)
        return flag
    }
    englishName() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId
        let val = addressObj.englishName || ''
        if (ctryid == '178' && !this.addressTest.reg_name_178.test(val)) {
            addressObj.error.englishName.value = this.language.tips.englishName.ru
            flag = false
        } else if (ctryid == '186' && val) {
            if ((val.length < 1 || val.length > 35) || !this.addressTest.reg_english_name.test(val)) {
              addressObj.error.englishName.value = this.language.tips.englishName.sa
              flag = false
            }
        }
        this._setAddressErrorValue('englishName', flag)
        return flag
    }
    state() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.state || ''
        if (this._isStoreBillingAddress() || (addressObj.noCheckState && addressObj.noCheckState.includes(ctryid))) {
        } else if (addressObj.keyShow.newState) {
            const stateFlag = addressObj.stateList.length && addressObj.stateList.some((item) => {
                return item.value == val && item.isShield === '1'
            })
            if (stateFlag) {
                addressObj.error.state.value = this.language.tips.er_blacklsit_1
                flag = false
            } else if (addressObj.noCheckArea && addressObj.noCheckArea.includes(ctryid)) {
                if (!val) {
                    addressObj.error.state.value = this.language.label.select_state
                    flag = false
                }
            } else {
                if (addressObj.addrCache._state[ctryid] && addressObj.addrCache._state[ctryid].length) {
                    let matchState = addressObj.addrCache._state[ctryid].filter(function(ele) {
                        return ele.name == val
                    })
                    if (!matchState.length) {
                        addressObj.error.state.value = this.language.label.select_state
                        flag = false
                    }
                }
            }
        } else if ($.inArray(ctryid, addressObj.stateRequired) > -1) {
            if (['57', '98'].includes(ctryid) && (val.length < 2 || val.length > 40)) {
                addressObj.error.state.value = this.language.tips.state.replace(60, 40)
                flag = false
            } else if (['108'].includes(ctryid) && (val.length < 2 || val.length > 20)) {
                addressObj.error.state.value = this.language.tips.state.replace(60, 20)
                flag = false
            } else if (val.length < 2 || val.length > 60) {
                addressObj.error.state.value = this.language.tips.state
                flag = false
            }
        } else if (['15', '47', '10', '166', '26', '216', '81', '40', '89', '24', '229', '235', '63', '69', '21', '107'].includes(ctryid)) {
            if (ctryid == '21') {
                if (val.length > 35 || val.includes('&') || val.includes('#')) {
                    addressObj.error.state.value = this.language.tips.state_35_be
                    flag = false
                }
            } else {
                if ((val.length > 35 || val.includes('&'))) {
                    addressObj.error.state.value = this.language.tips.state_35_special
                    flag = false
                }
            }
        } else if (ctryid == '191' && (val.length > 50 || this.addressTest.reg_single_quotes.test(val))) {
            addressObj.error.state.value = this.language.tips.state_50_sg
            flag = false
        } else if (['104', '172', '73', '58', '14'].includes(ctryid) && val.length > 35) {
            addressObj.error.state.value = this.language.tips.state_exceed_40.replace(40, 35)
            flag = false
        } else if (['173', '122'].includes(ctryid) && val.length > 40) {
            addressObj.error.state.value = this.language.tips.state_exceed_40
            flag = false
        } else if (['85'].includes(ctryid) && val.length && (val.length > 40 || !this.addressTest.reg_en_num_space.test(val))) {
            addressObj.error.state.value = this.language.tips.state_85.replace(60, 40)
            flag = false
        } else if (val.length > 60) {
            addressObj.error.state.value = this.language.tips.state_exceed
            flag = false
        }
        this._setAddressErrorValue('state', flag)
        return flag
    }
    newState() {
        return this.state()
    }
    city() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.city || ''
        if (addressObj.keyShow.newCity) {
            const cityFlag = addressObj.cityList.length && addressObj.cityList.some((item) => {
                return item.value == val && item.isShield === '1'
            })
            const cityError = {
                153: this.language.label.select_city_suburb,
                13: this.language.label.select_suburb,
                170: this.language.label.select_city_municipality,
            }
            if (cityFlag) {
                addressObj.error.city.value = this.language.tips.er_blacklsit_1
                flag = false
            } else if (addressObj.noCheckArea && addressObj.noCheckArea.includes(ctryid)) {
                if (!val) {
                    addressObj.error.city.value = cityError[ctryid] || this.language.label.select_city
                    flag = false
                }
            } else {
                let parentId = addressObj.getStateSelectedId(ctryid, addressObj.state)
                let cacheId = ctryid + '_' + parentId
                let matchCity = []
                if (addressObj.addrCache._city[cacheId] && addressObj.addrCache._city[cacheId].length) {
                    matchCity = addressObj.addrCache._city[cacheId].filter(function(ele) {
                        return ele.name == val
                    })
                }
                if (!matchCity.length) {
                    addressObj.error.city.value = cityError[ctryid] || this.language.label.select_city
                    flag = false
                }
            }
        } else if (ctryid == '225') {
            if (!this.addressTest.reg_city_225.test(val)) {
                addressObj.error.city.value = this.language.tips.city.replace('60', '28')
                flag = false
            }
        } else if (['15', '47', '10', '166', '26', '216', '81', '40', '89', '24', '229', '235', '63', '69', '21', '107'].includes(ctryid)) {
            if (ctryid == '21') {
              if (val.length < 2 || val.length > 35 || val.includes('&') || val.includes('#')) {
                    addressObj.error.city.value = this.language.tips.city_35_be
                    flag = false
              }
            } else {
              if (val.length < 2 || val.length > 35 || val.includes('&')) {
                    addressObj.error.city.value = this.language.tips.city_2_35_special
                    flag = false
              }
            }
        } else if (ctryid == '191') {
            if (val.length < 2 || val.length > 60) {
                addressObj.error.city.value = this.language.tips.city
                flag = false
            } else if (this.addressTest.reg_single_quotes.test(val)) {
                addressObj.error.city.value = this.language.tips.city_191
                flag = false
            }
        } else if (['191', '104', '172', '73', '58', '14'].includes(ctryid)) {
            if (val.length < 2 || val.length > 35) {
                addressObj.error.city.value = this.language.tips.city_2_40.replace(40, 35)
                flag = false
            } else if (ctryid == '172' && this.addressTest.reg_number.test(val)) {
                addressObj.error.city.value = this.language.tips.city_number
                flag = false
            }
        } else if (['57', '98', '173', '122'].includes(ctryid)) {
            if (val.length < 2 || val.length > 40) {
                addressObj.error.city.value = this.language.tips.city_2_40
                flag = false
            }
        } else if (ctryid == '161') {
            if (val.length < 2 || val.length > 50) {
                addressObj.error.city.value = this.language.tips.city.replace(60, 50)
                flag = false
            }
        } else if (ctryid == '108') {
            if (val.length < 2 || val.length > 30) {
              addressObj.error.city.value = this.language.tips.city.replace(60, 30)
              flag = false
            }
        } else if (['85'].includes(ctryid)) {
            if (!this.addressTest.reg_name_85.test(val)) {
              addressObj.error.city.value = this.language.tips.city_85.replace(60, 40)
              flag = false
            }
        } else if (val.length < 2 || val.length > 60) {
            const errorTips = {
                153: this.language.tips.city_153,
                13: this.language.tips.city_13
            }
            addressObj.error.city.value = errorTips[ctryid] || this.language.tips.city
            flag = false
        }
        this._setAddressErrorValue('city', flag)
        return flag
    }
    newCity() {
        return this.city()
    }
    district() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.district || ''
        if (addressObj.keyShow.newDistrict) {
            const districtFlag = addressObj.districtList.length && addressObj.districtList.some((item) => {
                return item.value == val && item.isShield === '1'
            })
            const districtError = {
                170: this.language.label.select_barangay,
            }
            if (districtFlag) {
                addressObj.error.district.value = this.language.tips.er_blacklsit_1
                flag = false
            } else if (addressObj.noCheckArea && addressObj.noCheckArea.includes(ctryid)) {
                if (!['137', '108'].includes(ctryid) && !val) {
                    addressObj.error.district.value = districtError[ctryid] || this.language.label.select_district
                    flag = false
                }
            } else {
                let state = addressObj.state
                let city = addressObj.city
                let parentId = addressObj.getCitySelectedId(ctryid, state, city)
                let cacheId = ctryid + '_' + parentId
                if (addressObj.addrCache._district[cacheId] && addressObj.addrCache._district[cacheId].length) {
                    let matchDistrict = addressObj.addrCache._district[cacheId].filter(function(ele) {
                        return ele.name == val
                    })
                    if (!matchDistrict.length) {
                        addressObj.error.district.value = districtError[ctryid] || this.language.label.select_district
                        flag = false
                    }
                }
            }
        } else if (ctryid == '30') {
          if (val.length && (val.length < 2 || val.length > 65)) {
            addressObj.error.district.value = this.language.tips.district_br
            flag = false
          }
        }
        this._setAddressErrorValue('district', flag)
        return flag
    }
    newDistrict() {
      return this.district()
    }
    street() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.street || ''
        if ($.inArray(ctryid, addressObj.middleEastCountry) > -1) {
            // 中东六国必填
            if (ctryid == '175') {
                if (val.length < 1 || val.length > 30) {
                  addressObj.error.street.value = this.language.tips.street_1_30
                  flag = false
                } else if (!this.addressTest.reg_number.test(val)) {
                  addressObj.error.street.value = this.language.tips.street_number
                  flag = false
                }
            } else if (val.length < 5 || val.length > 30) {
                addressObj.error.street.value = this.language.tips.street
                flag = false
            }
        } else {
            if (val.length > 100) {
                addressObj.error.street.value = this.language.tips.street_exceed
                flag = false
            }
        }
        this._setAddressErrorValue('street', flag)
        return flag
    }
    taxNumber() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.getTaxNumber() || ''
        if (ctryid === '30') {
            if (!this.addressTest.reg_cpf.test(val) && !this.addressTest.reg_cnpj.test(val)) {
                addressObj.error.taxNumber.value = this.language.tips.taxNumber
                flag = false
            } else if (!this._validateCpf(val) && !this._validateCnpj(val)) {
                addressObj.error.taxNumber.value = this.language.tips.taxNumber_valid
                flag = false
            }
        } else if (ctryid === '43') {
            if (!this.addressTest.reg_tn_43.test(val)) {
                addressObj.error.taxNumber.value = this.language.tips.taxNumber_valid_cl
                flag = false
            }
        } else if (ctryid === '24') {
            if (!this.addressTest.create_reg_num(6).test(val)) {
                addressObj.error.taxNumber.value = this.language.tips.taxNumber_valid_bm
                flag = false
            }
        } else if (ctryid === '10') {
            if (!this.addressTest.create_reg_num(11).test(val)) {
                addressObj.error.taxNumber.value = this.language.tips.taxNumber_valid_bm.replace(6, 11)
                flag = false
            }
        } else if (ctryid === '197') {
          if (val && !this.addressTest.reg_tn_197.test(val)) {
            addressObj.error.taxNumber.value = this.language.tips.taxNumber_valid_kr
            flag = false
          }
        }

        this._setAddressErrorValue('taxNumber', flag)
        return flag
    }
    address1() {
        let addressObj = this.addressObj
        const { postcode, city } = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.address1 || ''
        if (this._isStoreBillingAddress()) {
            if (ctryid == '74') {
                if (val.length < 5 || val.length > 144) {
                    addressObj.error.address1.value = this.language.tips.address1.replace('100', '144')
                    flag = false
                } 
            } else {
                if (val.length < 1 || val.length > 80) {
                    addressObj.error.address1.value = this.language.tips.address1.replace('5', '1').replace('100', '80')
                    flag = false
                }  
            }
        } else if (addressObj.pageType != 'billing' && ctryid != '226' && this.addressTest.reg_pobox_0.test(val)) {
            addressObj.error.address1.value = this.language.tips.address1_po
            flag = false
        } else if (ctryid == '225') {
            if (!this.addressTest.reg_225.test(val) || val.length < 5 || val.length > 35) {
                addressObj.error.address1.value = this.language.tips.address1_5_35
                flag = false
            }
        } else if (ctryid == '137') {
            if (!this.addressTest.reg_137.test(val) || val.length < 5 || val.length > 35) {
                addressObj.error.address1.value = this.language.tips.address1_5_35
                flag = false
            }
        } else if (ctryid == '226') {
            if (!this.addressTest.reg_226.test(val) || val.length < 5 || val.length > 30) {
                addressObj.error.address1.value = this.language.tips.address1_5_35.replace('35', '30')
                flag = false
            }
        } else if (ctryid == '13') {
            if (!this.addressTest.reg_13.test(val) || val.length < 5 || val.length > 40) {
                addressObj.error.address1.value = this.language.tips.address1_5_35.replace('35', '40')
                flag = false
            }
        } else if (['38', '14'].includes(ctryid)) {
            if (val.length < 5 || val.length > 35) {
                addressObj.error.address1.value = this.language.tips.address1.replace('100', '35')
                flag = false
            }
        } else if (['74'].includes(ctryid)) {
            if (val.length < 5 || val.length > 70) {
                addressObj.error.address1.value = this.language.tips.address1.replace('100', '70')
                flag = false
            }
        } else if (ctryid == '97') {
            //let gblen = addressObj.gblen(val)
			let gblen = val.length
            if (gblen < 5 || gblen > 100) {
                addressObj.error.address1.value = this.language.tips.address1
                flag = false
            }
        } else if (ctryid == '209') {
            if (addressObj.pageType != 'billing' && this.addressTest.reg_no_en.test(val)) {
                addressObj.error.address1.value = this.language.tips.address_3en
                flag = false
            } else if (val.indexOf('@') != -1) { // android 4.4 h5不能用includes
                addressObj.error.address1.value = this.language.tips.address_charater
                flag = false
            } else if(this.addressTest.reg_en_num_space.test(val) || val.length < 2 || val.length > 30){
                addressObj.error.address1.value = this.language.tips.address1_2_30
                flag = false
            } else if (!this.addressTest.reg_chinese_character.test(val)) {
                addressObj.error.address1.value = this.language.tips.address1_no_special_character
                flag = false
            }
        } else if (ctryid == '206' || ctryid == '30') {
            if (val.length < 5 || val.length > 45) {
                addressObj.error.address1.value = this.language.tips.address1.replace('100', '45')
                flag = false
            }
        } else if (ctryid == '101') {
            if (val.length < 5 || val.length > 80) {
                addressObj.error.address1.value = this.language.tips.address1.replace('100', '80')
                flag = false
            }
        } else if (['106', '58', '85'].includes(ctryid)) {
            if (val.length < 5 || val.length > 35) {
                addressObj.error.address1.value = this.language.tips.address1.replace('100', '35')
                flag = false
            }
        } else if (ctryid == '198') {
            if (val.length < 5 || val.length > 40) {
                addressObj.error.address1.value = this.language.tips.address1.replace('100', '40')
                flag = false
            }
        } else if (ctryid == '212') {
            if (val.length < 5 || val.length > 50 || this.addressTest.reg_212.test(val)) {
                addressObj.error.address1.value = this.language.tips.address1_5_100_th.replace(100, 50)
                flag = false
            }
        } else if (ctryid == '176') {
            if (!this.addressTest.reg_en_num_space.test(val) || this.addressTest.reg_num_all.test(val) || val.length < 2 || val.length > 35) {
                addressObj.error.address1.value = this.language.tips.address1_5_35.replace('5', '2')
                flag = false
            }
        } else if (ctryid == '82') {
            if (val.length < 2 || val.length > 50) {
                addressObj.error.address1.value = this.language.tips.address1_5_40.replace('5', '2').replace('40', '50')
                flag = false
            }
        } else if (ctryid == '105') {
            if (val.length < 5 || val.length > 120) {
                addressObj.error.address1.value = this.language.tips.street_address_5_35.replace('35', '120')
                flag = false
            }
        } else if (['21', '123'].includes(ctryid)) {
            if (val.length < 5 || val.length > 35) {
                addressObj.error.address1.value = this.language.tips.street_address_5_35
                flag = false
            }  else if (!this.addressTest.reg_number.test(val)) {
                addressObj.error.address1.value = this.language.tips.street_contain_house_no
                flag = false
            } else if (ctryid == '21' && this.addressTest.reg_num_up_6.test(val)) {
                addressObj.error.address1.value = this.language.tips.address1_be
                flag = false
            }
        } else if (ctryid == '150') {
            if (val.length < 2 || val.length > 30) {
                addressObj.error.address1.value = this.language.tips.street.replace('5', '2')
                flag = false
            }
        } else if (ctryid == '233') {
            if (val.length < 5 || val.length > 120) {
                addressObj.error.address1.value = this.language.tips.street_address_5_120
                flag = false
            }
        } else if (['100', '14'].includes(ctryid)) {
            if (val.length < 5 || val.length > 100) {
                addressObj.error.address1.value = this.language.tips.address1_5_100_in
                flag = false
            } else if (['14'].includes(ctryid) && !this.addressTest.reg_number.test(val)) {
                addressObj.error.address1.value = this.language.tips.street_contain_house_no
                flag = false
            }
        } else if (['174', '189', '61', '135', '129', '146'].includes(ctryid)) {
            if (val.length < 2 || val.length > 35) {
                addressObj.error.address1.value = this.language.tips.address1.replace('5', '2').replace('100', '35')
                flag = false
            }    
        } else if (['133', '52', '88', '36', '63', '65', '76', '96', '154', '169'].includes(ctryid)) {
            if (val.length < 2 || val.length > 45) {
              addressObj.error.address1.value = this.language.tips.address1.replace('5', '2').replace('100', '45')
              flag = false
            }
        } else if (ctryid == '175') {
            if (val.length < 1 || val.length > 50) {
              addressObj.error.address1.value = this.language.tips.address1_1_50
              flag = false
            } else if (!this.addressTest.reg_number.test(val)) {
              addressObj.error.address1.value = this.language.tips.address1_number
              flag = false
            }
        } else if (['15', '47', '10', '166', '26', '216', '81', '40', '89', '24', '229', '235', '63', '69', '21', '107'].includes(ctryid)) {
            if (val.length < 5 || val.length > 45 || val.includes('&')) {
                addressObj.error.address1.value = this.language.tips.address1_5_45_special
                flag = false
            }
        } else if (ctryid == '191') {
            if (val.length < 5 || val.length > 75 || this.addressTest.reg_single_quotes.test(val)) {
                addressObj.error.address1.value = this.language.tips.address1_5_75_sg
                flag = false
            }
        } else if (['104'].includes(ctryid)) {
            if (val.length < 7 || val.length > 35) {
              addressObj.error.address1.value = this.language.tips.address1.replace(5, 7).replace('100', '35')
              flag = false
            }
        } else if (['170'].includes(ctryid)) {
            if (val.length < 5 || val.length > 150) {
              addressObj.error.address1.value = this.language.tips.address1.replace('100', '150')
              flag = false
            } else if (this.addressTest.reg_address1_ph.test(val)) {
              addressObj.error.address1.value = this.language.tips.address1_special_ph
              flag = false
            }
        } else if (ctryid == '172') {
          if (val.length < 5 || val.length > 39) {
            addressObj.error.address1.value = this.language.tips.street_address_5_35.replace(35, 39)
            flag = false
          } else {
            const sameWords = new RegExp(`^(${ city }|${ postcode })([\\s]*(${ postcode }|${ city }))?$`)
            if (sameWords.test(val)) {
              addressObj.error.address1.value = this.language.tips.refilling_existing
              flag = false
            }
          }
        } else if (val.length < 5 || val.length > 100) {
            addressObj.error.address1.value = this.language.tips.address1
            flag = false
        }
        this._setAddressErrorValue('address1', flag)
        return flag
    }
    address2(isSubmit = false) {
        let addressObj = this.addressObj
        const { postcode, city } = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.address2 || ''
        let address1 = addressObj.address1 || ''
        if (this._isStoreBillingAddress()) {
            if (ctryid == '74') {
                if ((val.length + address1.length) > 144) {
                    addressObj.error.address2.value = this.language.tips.address2_74.replace('70', '144')
                    flag = false 
                }
            } else {
                if ((val.length + address1.length) > 80) {
                    addressObj.error.address2.value = this.language.tips.address2_74.replace('70', '80')
                    flag = false 
                }
            }
        } else if (ctryid == '100') {
            if (val.length < 5 || val.length > 100) {
                addressObj.error.address2.value = this.language.tips.address2_100_in
                flag = false
            }
        } else if (['38'].includes(ctryid) && val.length > 35) {
            addressObj.error.address2.value = this.language.tips.address2.replace('100', '35')
            flag = false
        } else if (ctryid == '74' && (val.length + address1.length) > 70) {
            addressObj.error.address2.value = this.language.tips.address2_74
            flag = false 
        } else if (ctryid == '176') {
            if (val && (!this.addressTest.reg_en_num_space.test(val) || this.addressTest.reg_num_all.test(val) || val.length > 35)) {
                addressObj.error.address2.value = this.language.tips.address2_90.replace('90', '35')
                flag = false
            }
        } else if (ctryid == '209') {
            if (val && addressObj.pageType != 'billing' && this.addressTest.reg_no_en.test(val)) {
                addressObj.error.address2.value = this.language.tips.address_3en
                flag = false
            } else if (val.indexOf('@') != -1) { // android 4.4 h5不能用includes
                addressObj.error.address2.value = this.language.tips.address_charater
                flag = false
            } else if (val && !this.addressTest.reg_chinese_character.test(val)) {
                addressObj.error.address2.value = this.language.tips.address1_no_special_character
                flag = false
            } else if (val && val.length > 30) {
                addressObj.error.address2.value = this.language.tips.address2_30
                flag = false
            }
        } else if (ctryid == '226') {
            if (!this.addressTest.reg_226.test(val) || val.length > 30) {
                addressObj.error.address2.value = this.language.tips.address2_90.replace('90', '30')
                flag = false
            }
        } else if (ctryid == '13') {
            if (!this.addressTest.reg_13.test(val) || val.length > 40) {
                addressObj.error.address2.value = this.language.tips.address2_90.replace('90', '40')
                flag = false
            }
        } else if (ctryid == '212') {
            if (val.length > 50 || this.addressTest.reg_212.test(val)) {
                addressObj.error.address2.value = this.language.tips.address2_100_th.replace(100, 50)
                flag = false
            }
        } else if (['206', '30', '133', '52', '88', '36', '63', '65', '76', '96', '154', '169'].includes(ctryid)) {
            if (val.length > 45) {
                addressObj.error.address2.value = this.language.tips.address2.replace('100', '45')
                flag = false
            } else if ((val || isSubmit) && ctryid == '30') {
                if (!this.addressTest.reg_number.test(val + address1)) {
                    addressObj.error.address2.value = this.language.tips.address2_number
                    flag = false
                }
            }
        } else if (ctryid == '101' || ctryid == '175') {
            if (val.length > 50) {
                addressObj.error.address2.value = ctryid == '175' ? this.language.tips.address2_exceed_50 : this.language.tips.address2.replace('100', '50')
                flag = false
            }
        } else if (['106', '85'].includes(ctryid)) {
            let a1 = addressObj.address1 || '';
            if (+a1.length+(+val.length) > 35) {
                addressObj.error.address2.value = (ctryid == '85') ? this.language.tips.address2_35_house_no : this.language.tips.address2_35_it
                flag = false
            }
        } else if (ctryid == '198') {
            if (val.length > 40) {
                addressObj.error.address2.value = this.language.tips.address2.replace('100', '40')
                flag = false
            }
        } else if (ctryid == '225') {
            if (!this.addressTest.reg_225.test(val) || val.length > 35) {
                addressObj.error.address2.value = this.language.tips.address2_90.replace('90', '35')
                flag = false
            }
        } else if (ctryid == '137') {
            if (!this.addressTest.reg_137.test(val) || val.length > 35) {
                addressObj.error.address2.value = this.language.tips.address2_90.replace('90', '35')
                flag = false
            }
        } else if (ctryid == '82') {
            if (!val.length) {
                addressObj.error.address2.value = this.language.label.address2_empty
                flag = false
            } else if ((val.length + address1.length) > 60) {
                addressObj.error.address2.value = this.language.tips.address2_82
                flag = false
            }
        } else if (ctryid == '150') {
            if (!val.length) {
                addressObj.error.address2.value = this.language.label.address2_empty
                flag = false
            } else if ((val.length + address1.length) > 35) {
                addressObj.error.address2.value = this.language.tips.address2_82.replace('60', '35')
                flag = false
            }
        } else if (['174', '189', '61', '135', '129', '146', '58'].includes(ctryid)) {
            if (val.length > 35) {
                addressObj.error.address2.value = this.language.tips.address2.replace('100', '35')
                flag = false
            }
        } else if (['15', '47', '10', '166', '26', '216', '81', '40', '89', '24', '229', '235', '63', '69', '21', '107'].includes(ctryid)) {
            if (val.length > 45 || val.includes('&')) {
                addressObj.error.address2.value = this.language.tips.address2_45_special
                flag = false
            }
        } else if (ctryid == '191') {
            if (val.length > 75 || this.addressTest.reg_single_quotes.test(val)) {
                addressObj.error.address2.value = this.language.tips.address2_75_sg
                flag = false
            }
        } else if (ctryid == '172' && (val || isSubmit)) {
            if ((val.length + address1.length) > 39) {
                addressObj.error.address2.value = this.language.tips.address2_39_pl
                flag = false
            } else if (!this.addressTest.reg_number.test(val) && !this.addressTest.reg_number.test(address1)) {
                addressObj.error.address2.value = this.language.tips.street_contain_house_no
                flag = false
            } else {
              const sameWords = new RegExp(`^(${ city }|${ postcode })([\\s]*(${ postcode }|${ city }))?$`)
              if (sameWords.test(val)) {
                addressObj.error.address2.value = this.language.tips.refilling_existing
                flag = false
              }
            }
        } else if (['57', '98', '73', '173'].includes(ctryid)) {
            if (val.length > 60) {
                addressObj.error.address2.value = this.language.tips.address2.replace('100', '60')
                flag = false
            }
        } else if (ctryid == '104') {
            if ((val.length + address1.length) > 60) {
                addressObj.error.address2.value = this.language.tips.address2_74.replace('70', '60')
                flag = false
            }
        } else if (['170'].includes(ctryid) && val) {
          if (val.length > 100) {
            addressObj.error.address2.value = this.language.tips.address2
            flag = false
          } else if (this.addressTest.reg_address1_ph.test(val)) {
            addressObj.error.address2.value = this.language.tips.address1_special_ph
            flag = false
          }
        } else if (val.length > 100) {
            addressObj.error.address2.value = this.language.tips.address2
            flag = false
        }
        this._setAddressErrorValue('address2', flag)
        return flag
    }
    postcode(errorFlag = true) {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.postcode || ''
        const isShield = addressObj.postcodeList.length && addressObj.postcodeList.some((item) => {
            return item.value === val && item.isShield === '1'
        })
        if (isShield) {
            flag = false
            addressObj.error.postcode.value = this.language.tips.er_blacklsit_1
        } else if ($.inArray(ctryid, addressObj.noCheckPostocde) == -1 || val) {
            if ($.inArray(ctryid, addressObj.hasCheckPost) > -1) {
                flag = this._checkPostcodeByCountry(ctryid, val)
                // 邮编限制位置提示转换
                const curTips = this.language.postcode[ctryid]
                const postcodeTips = {
                    ...this.language.postcode,
                    '193': curTips.replace('6', '4'),
                    '139': curTips.replace('6', '4'),
                    '71': curTips.replace('6', '3'),
                    '170': curTips.replace('6', '4'),
                    '15': curTips.replace('6', '4'),
                    '10': curTips.replace('6', '4'),
                    '81': curTips.replace('6', '4'),
                    '69': curTips.replace('6', '4'),
                }
                if(!flag) {
                    addressObj.error.postcode.value = postcodeTips[ctryid]
                }
            } else if (val.length < 2 || val.length > 30) {
                flag = false
                addressObj.error.postcode.value = this.language.tips.postcode
            }
        }
        errorFlag && this._setAddressErrorValue('postcode', flag)
        return flag
    }
    tel() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.tel || ''
        if ($.inArray(ctryid, addressObj.hasStandbyTel) > -1) {
            flag = this._checkCodTelByCountry(ctryid, 'tel')        
        } else if (ctryid == 225 && !this.addressTest.reg_tel_225.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_uk
            flag = false
        } else if (ctryid == 198 && !this.addressTest.reg_tel_198.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_uk.replace('16', '13')
            flag = false
        } else if (ctryid == 137 && !this.addressTest.create_reg_num(10).test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_mx
            flag = false
        } else if (ctryid == 101 && !this.addressTest.reg_tel_101.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_uk.replace('5', '9').replace('16', '12')
            flag = false
        } else if ((ctryid == 74 || ctryid == 226 || ctryid == 38 || ctryid == 178 || ctryid == 85) && !this.addressTest.reg_tel_212.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_th
            flag = false
        } else if (ctryid == 206 && !this.addressTest.reg_tel_206.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_sv
            flag = false
        } else if (['30', '108'].includes(ctryid) && !this.addressTest.reg_tel_30.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_br.replace('8', '10')
            flag = false
        } else if (ctryid == 13 && !this.addressTest.reg_tel_13.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_uk.replace('5', '9').replace('16', '10')
            flag = false
        } else if ((ctryid == 97 || ctryid == 58) && !this.addressTest.reg_tel_97.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_hk
            flag = false
        } else if (ctryid == 105 && !this.addressTest.reg_tel_105.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_il
            flag = false
        } else if (['15', '47', '10', '166', '26', '216', '104', '81', '40', '89', '24', '229', '235', '63', '69', '14', '21', '107'].includes(ctryid) && !this.addressTest.reg_tel_137.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_5_25
            flag = false
        } else if (ctryid == 191 && !this.addressTest.reg_tel_191.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_sg
            flag = false
        } else if (['172', '73'].includes(ctryid) && !this.addressTest.create_reg_num(9).test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_th.replace(10, 9)
            flag = false
        } else if (ctryid == 170 && !this.addressTest.reg_tel_170.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel_ph.replace('05', 9)
            flag = false
        } else if (!this.addressTest.reg_tel.test(val)) {
            addressObj.error.tel.value = this.language.tips.tel
            flag = false
        }
        this._setAddressErrorValue('tel', flag)
        return flag
    }
    standbyTel() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.standbyTel || ''
        if (val) {
            flag = this._checkCodTelByCountry(ctryid, 'standbyTel')
            if (flag && val == addressObj.tel) {
                addressObj.error.standbyTel.value = this.language.tips.tel_no_same
                flag = false
            }
        }
        this._setAddressErrorValue('standbyTel', flag)
        return flag
    }
    nationalId() {
        let addressObj = this.addressObj
        let flag = true
        let ctryid = addressObj.countryId + ''
        let val = addressObj.nationalId || ''
        if (ctryid === '186') {
            if ((val || addressObj.operateType == 'supplement') && !this.addressTest.reg_nid_186.test(val)) {
                addressObj.error.nationalId.value = this.language.tips.national_id
                flag = false
            }
        } else if (ctryid === '109') {
            if (!this.addressTest.reg_nid_109.test(val)) {
                addressObj.error.nationalId.value = this.language.tips.national_id_jo
                flag = false
            }
        } else if (ctryid === '218') {
            if (!this.addressTest.create_reg_num(11).test(val)) {
                addressObj.error.nationalId.value = this.language.tips.national_id_tr
                flag = false
            }
        }  else if (ctryid === '105') {
            if ((val || addressObj.operateType == 'supplement') && !this.addressTest.create_reg_num(9).test(val)) {
              addressObj.error.nationalId.value = this.language.tips.national_id_il
              flag = false
            }
        } else if (ctryid === '175') {
            if (!this.addressTest.reg_nid_175.test(val)) {
                addressObj.error.nationalId.value = this.language.tips.national_id_qa
                flag = false
            }
        }
        this._setAddressErrorValue('nationalId', flag)
        return flag
    }

    zone() {
        const addressObj = this.addressObj
        let flag = true
        const ctryid = addressObj.countryId
        const val = addressObj.zone || ''
        if (ctryid == '175') {
          if (val.length < 1 || val.length > 50) {
            addressObj.error.zone.value = this.language.tips.zone_1_50
            flag = false
          } else if (!this.addressTest.reg_number.test(val)) {
            addressObj.error.zone.value = this.language.tips.zone_number
            flag = false
          }
        }
        this._setAddressErrorValue('zone', flag)
        return flag
    }

    blacklist(type, index = 1) {
        // 偏远地区
        let addressObj = this.addressObj
        const ctryid = addressObj.countryId
        setTimeout(() => {
            addressObj.error[type].show = true
            const errorKey = (index == 5 && ctryid == 137) ? 'er_blacklsit_6' : `er_blacklsit_${index}`
            addressObj.error[type].value = this.language.tips[errorKey]
        }, 1000)
    }
    _setAddressErrorValue(type, flag) {
        if (this.addressObj && this.addressObj.error && this.addressObj.error[type]) {
            this.addressObj.error[type].show = !flag
            this.addressObj.error[type].flag = flag
        }
    }
    _checkPostcodeByCountry(country, postcode) {
        let check_result = true
        if (country == '226') {
            //国家为“美国”
            let reg1 = new RegExp(/^[0-9]\d{4}$/)
            let reg2 = new RegExp(/^[0-9]\d{4}[-]{1}\d{4}$/)
            if (!reg1.test(postcode) && !reg2.test(postcode)) {
                check_result = false
            }
        } else if (country == '13') {
            //国家为澳大利亚
            let reg = new RegExp(/^[0-9]\d{3}$/)
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '57' || country == '85' || country == '192') {
            let reg = /^\d{3}\s\d{2}$/
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '106') {
            let reg = /^((I-)|(IT-)){0,1}\d{5}$/
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (['100', '178', '36', '110'].includes(country)) {
            let reg = /^\d{6}$/
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (['82', '74', '206', '54', '68', '73', '176', '101', '209', '137', '218', '212', '233', '144', '109', '64', '89', '235', '197', '122'].includes(country)) {
            // 5位数字
            let reg = new RegExp(/^\d{5}$/)
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (['21', '14', '33', '58', '98', '116', '123', '161', '207', '139', '193', '196', '81', '69', '153'].includes(country)) {
            //4位数字
            let reg = new RegExp(/^\d{4}$/)
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '198') {
            //西班牙
            let reg = new RegExp(/^[0,1,2,3,4,5]\d{4}$/g)
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '150') {
            //荷兰4位数字+2位字母
            let reg = new RegExp(/^\d{4}\s[A-Za-z]{2}$/)
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '172') {
            let reg = /^\d{2}\-\d{3}$/
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '173') {
            let reg = /^\d{4}\-\d{3}$/
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '225') {
            //英国
            let reg = /^([A-PR-UWYZ0-9][A-HK-Y0-9][A-Z0-9]?[A-Z0-9]? {1}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/i
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '193') {
            let reg = /^SI-\d{4}$/i
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (['105', '43'].includes(country)) {
            let reg = /^\d{7}$/
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '30') {
            let reg = /^\d{5}\-\d{3}$/
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '38') {
            let reg = /^[A-Z]{1}\d{1}[A-Z]{1} \d{1}[A-Z]{1}\d{1}$/i
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (country == '186') {
            let reg = /^\d{2,12}$/
            if (!reg.test(postcode)) {
                check_result = false
            }
        } else if (['71'].includes(country)) {
            const reg = this.addressTest.reg_num_3
            check_result = reg.test(postcode)
        } else if (['170', '15', '10'].includes(country)) {
            check_result = this.addressTest.reg_num_4.test(postcode)
        } else if (['191', '47', '229', '63'].includes(country)) {
            check_result = this.addressTest.create_reg_num(6).test(postcode)
        } else if (country == '108') {
            check_result = this.addressTest.reg_postcode_jp.test(postcode)
        } else if (['166', '26', '216', '40', '24', '107'].includes(country)) {
            check_result = postcode.length >= 2 && postcode.length <= 12
        } else if (country == '104') {
            check_result = this.addressTest.reg_postcode_ie.test(postcode)
        } else if (country == '117') {
            check_result = this.addressTest.reg_postcode_lb.test(postcode)
        }
        return check_result
    }
    _checkCodTelByCountry(countryId, key) {
        let flag = true
        let addressObj = this.addressObj
        let val = addressObj[key]
        if (countryId == 224 && !this.addressTest.reg_tel_224.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_col
            flag = false
        } else if (countryId == 186 && !this.addressTest.reg_tel_186.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_ar
            flag = false
        } else if (countryId == 113 && !this.addressTest.reg_tel_113.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_kw
            flag = false
        } else if (countryId == 175 && !this.addressTest.reg_tel_175.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_col
            flag = false
        } else if (countryId == 162 && !this.addressTest.reg_tel_162.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_om
            flag = false
        } else if (countryId == 17 && !this.addressTest.reg_tel_97.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_th.replace('10', '8')
            flag = false
        } else if (countryId == 100 && !this.addressTest.reg_tel_100.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_in
            flag = false
        } else if (countryId == 209 && !this.addressTest.reg_tel_209.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_tw
            flag = false
        } else if (countryId == 212 && !this.addressTest.reg_tel_th.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_th_zero
            flag = false
        } else if (countryId == 233 && !this.addressTest.reg_tel_233.test(val)) {
            addressObj.error[key].value = this.language.tips.tel_vi
            flag = false
        }
        return flag
    }
    _isNumeric(value) {
        return /^\d{1}$/.test(value)
    }
    _arraySum(array) {
        let sum = 0
        array.map(item => {
            sum += item
        })
        return sum
    }
    _validateCpf(value) {
        let cpf = value
        let j = 0
        let num = []
        for (let i = 0; i < cpf.length; i++) {
            if (this._isNumeric(cpf[i])) {
                num.push(cpf[i])
                j++
            }
        }

        if (j == 0) {
            return false
        }

        if (num.length != 11) {
            return false
        } else {
            for (let i = 0; i < 10; i++) {
                if (num[0] == i && num[1] == i && num[2] == i && num[3] == i && num[4] == i && num[5] == i && num[6] == i && num[7] == i && num[8] == i) {
                    return false
                }
            }
        }

        j = 10
        let multiplica = []
        for (let i = 0; i < 9; i++) {
            multiplica.push(num[i] * j)
            j--
        }
        let soma = this._arraySum(multiplica)
        let resto = soma % 11
        let dg = ''
        if (resto < 2) {
            dg = 0
        } else {
            dg = 11 - resto
        }
        if (dg != num[9]) {
            return false
        }

        j = 11
        multiplica = []
        for (let i = 0; i < 10; i++) {
            multiplica[i] = num[i] * j
            j--
        }
        soma = this._arraySum(multiplica)
        resto = soma % 11
        if (resto < 2) {
            dg = 0
        } else {
            dg = 11 - resto
        }
        if (dg != num[10]) {
            return false
        } else {
            return true
        }
    }
    _validateCnpj(value) {
        let cnpj = value
        let j = 0
        let num = []
        for (let i = 0; i < cnpj.length; i++) {
            this._isNumeric(cnpj[i])
            if (this._isNumeric(cnpj[i])) {
                num[j] = cnpj[i]
                j++
            }
        }

        if (j == 0) {
            return false
        }

        if (num.length != 14) {
            return false
        }

        if (num[0] == 0 && num[1] == 0 && num[2] == 0 && num[3] == 0 && num[4] == 0 && num[5] == 0 && num[6] == 0 && num[7] == 0 && num[8] == 0 && num[9] == 0 && num[10] == 0 && num[11] == 0) {
            return false
        } else {
            j = 5
            let multiplica = []
            for (let i = 0; i < 4; i++) {
                multiplica[i] = num[i] * j
                j--
            }
            //let soma = this._arraySum(multiplica);
            j = 9
            for (let i = 4; i < 12; i++) {
                multiplica[i] = num[i] * j
                j--
            }
            let soma = this._arraySum(multiplica)
            let resto = soma % 11
            let dg = ''
            if (resto < 2) {
                dg = 0
            } else {
                dg = 11 - resto
            }
            if (dg != num[12]) {
                return false
            }
        }

        j = 6
        let multiplica = []
        for (let i = 0; i < 5; i++) {
            multiplica[i] = num[i] * j
            j--
        }
        //let soma = this._arraySum(multiplica);
        j = 9
        for (let i = 5; i < 13; i++) {
            multiplica[i] = num[i] * j
            j--
        }
        let soma = this._arraySum(multiplica)
        let resto = soma % 11
        let dg = ''
        if (resto < 2) {
            dg = 0
        } else {
            dg = 11 - resto
        }
        if (dg != num[13]) {
            return false
        } else {
            return true
        }
    }
    // 账单地址是否为店配
    _isStoreBillingAddress() {
        const addressObj = this.addressObj
        const ctryid = +addressObj.countryId
        return addressObj.pageType === 'billing' && addressObj.storeType && addressObj.eurShopTransit.includes(ctryid)
    }
}

export default AddressCheck
