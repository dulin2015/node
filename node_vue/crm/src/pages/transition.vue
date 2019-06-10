<template>
  <div class="page-transition">
    <h3>问题1</h3>
    {{formData.length}}
    <el-form :inline="true" label-width="80px">
      <el-col :span="20">
        <el-row>
          <el-col :span="5" v-for="(item, index) of formData" :key="index" v-if="index < 4">
            <el-form-item :label="`${item.label}`">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <transition
            name="search"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
            @after-leave="afterLeave"
          >
            <div class="search-content" v-show="showMore">
              <el-col :span="5" v-for="(item, index) of formData" :key="index" v-if="index >= 4">
                <el-form-item :label="`${item.label}`">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </div>
          </transition>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-form-item class="is-center">
          <el-button type="text" @click="showMore = !showMore">显示更多</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <br>
    <br>
    <h3>问题2</h3>
    selectedFolderIds======= {{selectedFolderIds}}<br />
    selectedFolderItems======= {{selectedFolderItems}}
    <el-form :inline="true" label-width="80px">
      <el-form-item label="文件夹">
        <div class="el-select">
          <div 
            class="el-input" 
            @click="showDropdown = !showDropdown"
            @mouseleave="mouseLeaveFolder">
            <div class="el-input__inner">
              <div style="display:inline;" @click.stop>
                <el-tag 
                  v-for="(tag, index) of selectedFolderItems"
                  :key="index"
                  closable
                  @close="clearFolderTag(tag, index)">{{tag.file_name}}</el-tag>
              </div>
            </div>
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner">
                <i class="el-select__caret el-input__icon el-icon-arrow-up" :class="{'is-reverse': showDropdown}"></i>
              </span>
            </span>
          </div>
          <div class="folder-dropdown" 
            v-show="showDropdown"
            @mouseenter="mouseenterFolderDropdown"
            @mouseleave="showDropdown = false">
            <ul class="file-folder">
              <li class="file-folder-item" v-for="(file, index) of fileFolder" :key="index">
                <a href="javascript:;" 
                  class="file-folder-class-A" 
                  :class="{'on': selectedFolderIds.includes(file.id)}"
                  @click="clickFolderA(file, index)">{{file.file_name}}</a>
                <ul class="file-folder--inner">
                  <li class="file-folder-item file-folder-item--inner" v-for="(child, index) of file.child" :key="index">
                    <a href="javascript:;" 
                      class="file-folder-class-B"
                      :class="{'on': selectedFolderIds.includes(child.id)}"
                      @click="clickFolderB(file, child, index)">{{child.file_name}}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <br />
    <br />
    <h3>问题3</h3>
    moveSelectedIds==== {{moveSelectedIds}}<br />
    moveList===== {{moveList}}
    <div>
      <el-button type="primary" @click="up">上移</el-button>
      <el-button type="primary" @click="down">下移</el-button>
      <ul>
        <li v-for="(item, index) of moveList"
          :key="index">
          <a href="javascript:;" 
          :class="{'on': moveSelectedIds.includes(index)}"
          @click="clickMoveItem(item, index)">{{item.name}}</a>
        </li>
      </ul> 
    </div>
    <h4>问题4</h4>
    <div class="sec-location">
      <dl>
          <dt>省</dt>
          <dd>
            <div class="location-province">
              <a href="javascript:;" 
                class="location-item selected">
                <input type="checkbox" value="1" />
                <label>广东省</label>
              </a>
              <a href="javascript:;" 
                class="location-item">
                <input type="checkbox" value="1" />
                <label>广西省</label>
              </a>
              <a href="javascript:;" 
                class="location-item">
                <input type="checkbox" value="1" />
                <label>云南省</label>
              </a>
              <a href="javascript:;" 
                class="location-item">
                <input type="checkbox" value="1" />
                <label>福建省</label>
              </a>
            </div>
          </dd>
      </dl>
      <div class="location-city">
        <a href="javascript:;"
          class="location-item">
          <input type="checkbox" value="1-1"   />
          <label>广州市</label>
        </a>
        <a href="javascript:;"
          class="location-item selected">
          <input type="checkbox" value="1-2"   />
          <label>深圳市</label>
        </a>
        <a href="javascript:;"
          class="location-item">
          <input type="checkbox" value="1-3"   />
          <label>珠海市</label>
        </a>
        <a href="javascript:;"
          class="location-item">
          <input type="checkbox" value="1-4"   />
          <label>中山市</label>
        </a>
      </div>
      <div class="location-area">
        <a href="javascript:;"
          class="location-item">
          <input type="checkbox" value="1-2-1"   />
          <label>福田区</label>
        </a>
        <a href="javascript:;"
          class="location-item">
          <input type="checkbox" value="1-2-2"   />
          <label>罗湖区</label>
        </a>
        <a href="javascript:;"
          class="location-item">
          <input type="checkbox" value="1-2-3"   />
          <label>南山区</label>
        </a>
        <a href="javascript:;"
          class="location-item">
          <input type="checkbox" value="1-2-4"   />
          <label>宝安区</label>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: [
        {
          label: "姓名",
          key: "name"
        },
        {
          label: "年龄",
          key: "age"
        },
        {
          label: "毕业院校",
          key: "school"
        },
        {
          label: "姓名",
          key: "name"
        },
        {
          label: "年龄",
          key: "age"
        },
        {
          label: "毕业院校",
          key: "school"
        },
        {
          label: "姓名",
          key: "name"
        },
        {
          label: "年龄",
          key: "age"
        },
        {
          label: "毕业院校",
          key: "school"
        },
        {
          label: "姓名",
          key: "name"
        },
        {
          label: "年龄",
          key: "age"
        },
        {
          label: "毕业院校",
          key: "school"
        }
      ],
      fileFolder: [{
        id: '1',
        file_name: '文件夹1'
      }, {
        id: '2',
        file_name: '文件夹2'
      }, {
        id: '3',
        file_name: '文件夹3'
      }, {
        id: '4',
        file_name: '文件夹4',
        child: [{
          id: '4-1',
          file_name: '文件夹4-1'
        }, {
          id: '4-2',
          file_name: '文件夹4-2'
        }]
      }],
      selectedFolderIds: [],
      selectedFolderItems: [],
      showMore: false,
      showDropdown: false,
      folderTimer: null,
      moveList: [{
        name: '选择1',
        value: 1
      }, {
        name: '选择2',
        value: 2
      }, {
        name: '选择3',
        value: 3
      }, {
        name: '选择4',
        value: 4
      }, {
        name: '选择5',
        value: 5
      }],
      moveSelectedIds: [],
      provinceData: [{
        id: 1,
        name: '广东省'
      }, {
        id: 2,
        name: '广西省'
      }, {
        id: 3,
        name: '云南省'
      }, {
        id: 4,
        name: '福建省'
      }],
      cityData: [{
        id: '1-1',
        name: '广州市'
      }, {
        id: '1-2',
        name: '深圳市'
      }, {
        id: '1-3',
        name: '珠海市'
      }, {
        id: '1-4',
        name: '中山市'
      }],
      areaData: [{
        id: '1-2-1',
        name: '福田区'
      }, {
        id: '1-2-2',
        name: '罗湖区'
      }, {
        id: '1-2-3',
        name: '南山区'
      }, {
        id: '1-2-4',
        name: '宝安区'
      }, {
        id: '1-2-5',
        name: '龙岗区'
      }, {
        id: '1-2-6',
        name: '龙华区'
      }, {
        id: '1-2-7',
        name: '坪山区'
      }],
      provinceIndex: null,
      cityIndex: null,
      areaIndex: null
      
    };
  },
  computed: {
    computedHeight() {
      if (!this.showMore) {
        return { height: "62px" };
      }
      {
        let row = this.formData.length / 4,
          column = this.formData.length % 4;

        return {
          height: column == 0 ? `${row * 62}px` : `${(row + 1) * 62}px`
        };
      }
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.height = "0px";
      console.log("beforeEnter---------");
    },
    enter(el, done) {
      let row = this.formData.length / 4,
        column = this.formData.length % 4;
      if (column == 0) {
        el.style.height = (row - 1) * 62 + "px";
      } else {
        el.style.height = row * 62 + "px";
      }
      console.log("enter-----------");
    },
    leave(el) {
      el.style.height = "62px";
      console.log("leave-------");
    },
    afterLeave(el) {
      el.style.height = "0px";
      console.log("afterLeave--------");
    },
    clickFolderA(file, index) {
      if (!this.selectedFolderIds.length) {
        this.selectedFolderIds.push(file.id);
        this.selectedFolderItems.push(file);
      } else {
        if (this.selectedFolderIds.includes(file.id)) {
          this.selectedFolderIds = this.selectedFolderIds.filter(id => id != file.id);
          this.selectedFolderItems = this.selectedFolderItems.filter(slt => slt.id != file.id);
        } else {
          // 需要判断子集是否有被选中
          if (file.child) {
            file.child.forEach(item => {
              // 如果selectedFolderIds中包含子集的id，需要去掉子集的id
              if (this.selectedFolderIds.includes(item.id)) {
                this.selectedFolderIds = this.selectedFolderIds.filter(id => id != item.id);
                this.selectedFolderItems = this.selectedFolderItems.filter(slt => slt.id != item.id);
              }
            })
          }
          this.selectedFolderIds.push(file.id);
          this.selectedFolderItems.push(file);
        }
      }
    },
    clickFolderB(father_file, file, index) {
      if (!this.selectedFolderIds.length) {
        this.selectedFolderIds.push(file.id);
        this.selectedFolderItems.push(file);
      } else {
        // 需要判断该子集的父级是否有被选中
        if (this.selectedFolderIds.includes(father_file.id)) {
          this.selectedFolderIds = this.selectedFolderIds.filter(id => id != father_file.id);
          this.selectedFolderItems = this.selectedFolderItems.filter(slt => slt.id != father_file.id);
        }
        this.selectedFolderIds.push(file.id);
        this.selectedFolderItems.push(file);
      }
    },
    clearFolderTag(tag, index) {
      this.selectedFolderIds.splice(index, 1);
      this.selectedFolderItems.splice(index, 1);
    },
    mouseLeaveFolder() {
      this.folderTimer = setTimeout(() => {
        this.showDropdown = false;
      }, 200)
    },
    mouseenterFolderDropdown() {
      clearTimeout(this.folderTimer);
    },
    clickMoveItem(item, index) {
      if (!this.moveSelectedIds.length) {
        this.moveSelectedIds.push(index);
      } else {
        if (this.moveSelectedIds.includes(index)) {
          this.moveSelectedIds = this.moveSelectedIds.filter(slt => slt != index);
        } else {
          this.moveSelectedIds.push(index);
        }
      }
    },
    up() {
      if (!this.moveSelectedIds.length) {
        this.$message.warning(`没有可移动的数据~`);
        return;
      } 

      if (this.moveSelectedIds.includes(0)) {
        this.$message.warning(`第一个元素不能上移`);
        return;
      }

      let moveSelectedIds = this.moveSelectedIds;

      moveSelectedIds.sort(function(x, y) {
        return x - y;
      })

      moveSelectedIds.forEach((item, index) => {
        console.log(item, index)
        let temp_item = this.moveList[item - 1];
        this.$set(this.moveList, item-1, this.moveList[item]);
        this.$set(this.moveList, item, temp_item);
        this.moveSelectedIds[index] = item - 1;

      })
      
    },
    down() {
      if (!this.moveSelectedIds.length) {
        this.$message.warning(`没有可移动的数据~`);
        return;
      }

      if (this.moveSelectedIds.includes(this.moveList.length - 1)) {
        this.$message.warning(`最后一个元素不能下移`);
        return;
      }

      let moveSelectedIds = this.moveSelectedIds;

      moveSelectedIds.sort(function(x, y) {
        return y - x;
      });

      moveSelectedIds.forEach((item, index) => {
        let temp_item = this.moveList[item];
        this.$set(this.moveList, item, this.moveList[item + 1]);
        this.$set(this.moveList, item + 1, temp_item);
        this.moveSelectedIds[index] = item + 1;
      })

      // 1 0 "{"name":"选择2","value":2}"  { "name": "选择2", "value": 2 }
      // 2 1 "{"name":"选择2","value":2}"  { "name": "选择3", "value": 3 }
    },
    clickProvince(index) {
      this.provinceIndex = index;
    },
    clickCity(index) {
      this.cityIndex = index;
    }
  }
};
</script>

<style lang="scss">
.page-transition {
  width: 100%;
  // height: 62px;
  overflow: hidden;
}

.el-form-item {
  display: flex !important;
  width: 100%;
}

.el-form-item__content {
  flex: 1;
}

.search-content {
  opacity: 1;
  overflow: hidden;
  height: 0;
}

.search-enter-active,
.search-leave-active {
  transition: height 1s;
  // height: 62px;
}

.search-enter,
.search-leave-to {
  // height: 0;
}

.folder-dropdown {
  border: 1px solid #ccc;
}

ul {
  list-style: none;
  margin:0;
  padding: 0;
}

a {
  display: block;
  padding: 3px 5px;
  line-height: 28px;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    background: lightblue;
    color: #FFF;
  }

  &.on {
    background: lightblue;
    color: #FFF;
  }
}

.file-folder-class-B {
  padding: {
    left: 10px;
    right: 10px;
  }
}

* {
  box-sizing: content-box;
}

.sec-location {
  border: 1px solid #CDCDCD;
  margin: 10px;
  padding: 10px;
  font-size: 0;
  position: relative;
  height: 500px;

  dl {
    padding-left: 100px;
    margin: 0;
    font-size: 14px;
  }

  dt {
    width: 100px;
    float: left;
    margin-left: -100px;
    text-align: center;
  }

  dd {
    margin: 0;

  }
  
  .location-item {
    display: block;
    float: left;
    line-height: 30px;
    background: #FFF;
    border: 1px solid #FFF;

  }

  input {
    margin: 0;
    display: inline-block;
    vertical-align: middle;
    margin-top: -1px;
  }

  label {
    display: inline-block;
    margin-left: 5px;
    position: relative;
  }

  .location-province {
    .selected {
      border-color: aquamarine;
      border-bottom-color: #FFF;
      position: relative;
      // z-index: 10;
    }
  }

  .location-city {
    position: absolute;
    top: 47px;
    // z-index: 9;
    width: 800px;
    background: #FFF;
    border: 1px solid aquamarine;
    .selected {
      border-color: red;
      border-bottom-color: #FFF;
      position: relative;
      // z-index: 11;
    }
  }

  .location-area {
    position: absolute;
    // z-index: 10;
    top: 85px;
    background: #FFF;
    border: 1px solid red;
  }
}


</style>
