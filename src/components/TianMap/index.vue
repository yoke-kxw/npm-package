<template>
    <QDdialog ref="mydialog" :dialogVisible.sync="isOpen" top="30px" width="40%" @confim="map_enter">
        <div class="tian-main">
            <div class="map_input">
                <el-input v-model="searchName" size="mini" class="item_input" />
                <el-button type="primary" size="mini" @click="searchCity">搜索</el-button>
                <el-button type="success" size="mini" @click="polygonOpen">标注边界区域</el-button>
                <el-button type="danger" size="mini" @click="clearPolyGon">清除边界区域</el-button>
                <!-- <el-button type="primary" size="mini" @click="map_enter">确定</el-button> -->
            </div>
            <div v-if="isOpen" id="mapDiv" style="height:600px"></div>
        </div>
    </QDdialog>
</template>
    
<script>
import QDdialog from '@/components/QDdialog.vue'
export default {
    name: 'TianMap',
    components: {
        QDdialog,
    },
    props: {
        long: {
            type: String,
            default: "121.454309",
        },
        lat: {
            type: String,
            default: "37.471042",
        },
    },
    data() {
        return {
            isOpen: false,
            width: '30%',
            title: "标记边界范围",
            // 
            map: null,
            zoom: 17,
            marker: null,
            // long: "121.454309",
            // lat: "37.471042",
            overlays: [],
            localsearch: null,
            polygonTool: null,
            // 
            searchName: '',
            pointData: null,
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        close(val) {
            this.isOpen = val;
        },
        onSubmit() {
            // 关闭弹窗
            this.map_enter();
            this.$refs.mydialog.handleCancle();
        },
        // 打开
        openMapAreaDetail(obj) {
            this.isOpen = true;
            this.overlays=[]
            if (obj && obj.includes(",")) {
                this.pointData = obj;
            } else {
                this.pointData = null;
            }
            if (window.T) {
                setTimeout(() => {
                    this.initMap();
                }, 100)
            }
        },
        initMap() {
            var T = window.T;
            let _this = this;
            if (this.map) {
                this.map.clearOverLays();
            }
            let mapObj = new window.T.Map('mapDiv');
            _this.map = mapObj
            _this.map.centerAndZoom(new T.LngLat(_this.long, _this.lat), _this.zoom);

            _this.marker = new T.Marker(new T.LngLat(_this.long, _this.lat));

            let search_config = {
                onSearchComplete: _this.localSearchResult //接收数据的回调函数
            };
            //创建搜索对象
            _this.localsearch = new T.LocalSearch(_this.map, search_config);

            let config = {
                showLabel: true,
                color: "blue",
                weight: 3,
                opacity: 0.5,
                fillColor: "#1E9FFF",
                fillOpacity: 0.5
            };
            //创建标注工具对象
            _this.polygonTool = new T.PolygonTool(_this.map, config);
            //添加结束事件
            _this.polygonTool.addEventListener('draw', function (e) {
                _this.overlays = e.currentLnglats;
            })
            //显示
            _this.add_overlay();
        },
        localSearchResult(result) {
            let _this = this;

            _this.map.clearOverLays();
            //根据返回类型解析搜索结果
            switch (parseInt(result.getResultType())) {
                case 1:
                    //解析点数据结果
                    _this.pois(result.getPois());
                    break;
                case 2:
                    //解析推荐城市
                    _this.statistics(result.getStatistics());
                    break;
                case 3:
                    //解析行政区划边界
                    _this.area(result.getArea());
                    break;
                case 4:
                    //解析建议词信息
                    suggests(result.getSuggests());
                    break;
                case 5:
                    //解析公交信息
                    lineData(result.getLineData());
                    break;
            }
        },
        pois(obj) {
            var T = window.T;
            let _this = this;
            if (obj) {
                //坐标数组，设置最佳比例尺时会用到
                let zoomArr = [];
                for (let i = 0; i < 1; i++) {
                    //闭包
                    (function (i) {
                        //名称
                        let name = obj[i].name;
                        //地址
                        let address = obj[i].address;
                        //坐标
                        let lnglatArr = obj[i].lonlat.split(" ");
                        let lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
                        let winHtml = "名称:" + name + "<br/>地址:" + address;
                        //创建标注对象
                        //  let _this.marker = new T.Marker(lnglat);
                        //地图上添加标注点
                        // _this.map.addOverLay(_this.marker);
                        //注册标注点的点击事件
                        let markerInfoWin = new T.InfoWindow(winHtml, {
                            autoPan: true
                        });
                        _this.marker.addEventListener("click", function () {
                            _this.marker.openInfoWindow(markerInfoWin);
                        });
                        zoomArr.push(lnglat);
                        //搜索完成后 显示已标注的区域
                        _this.add_overlay();
                    })(i);
                }
                //显示地图的最佳级别
                _this.map.setViewport(zoomArr);
            }
        },
        area(obj) {
            let _this = this;
            var T = window.T;

            if (obj) {
                if (obj.points) {
                    //坐标数组，设置最佳比例尺时会用到
                    let pointsArr = [];
                    let points = obj.points;
                    for (let i = 0; i < points.length; i++) {
                        let regionLngLats = [];
                        let regionArr = points[i].region.split(",");
                        for (let m = 0; m < regionArr.length; m++) {
                            let lnglatArr = regionArr[m].split(" ");
                            let lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
                            regionLngLats.push(lnglat);
                            pointsArr.push(lnglat);
                        }
                        //创建线对象
                        let line = new T.Polyline(regionLngLats, {
                            color: "blue",
                            weight: 3,
                            opacity: 1,
                            lineStyle: "dashed"
                        });
                        //向地图上添加线
                        _this.map.addOverLay(line);
                    }
                    //显示最佳比例尺
                    _this.map.setViewport(pointsArr);
                }
                if (obj.lonlat) {
                    let regionArr = obj.lonlat.split(",");
                    //将地图的中心点变换到指定的地理坐标
                    _this.map.panTo(new T.LngLat(regionArr[0], regionArr[1]));
                    //地图上添加标注点
                    //_this.map.addOverLay();
                    let lnglat = {
                        lat: regionArr[1],
                        lng: regionArr[0]
                    };
                    //创建标注对象
                    let marker = new T.Marker(lnglat);
                    //地图上添加标注点
                    _this.map.addOverLay(marker);
                    document.getElementById("lnglatStr").value = regionArr[0] + "," + regionArr[1];
                }
            }
        },
        statistics(obj) {

            if (obj) {
                //坐标数组，设置最佳比例尺时会用到
                let pointsArr = [];
                let priorityCitysHtml = "";
                let allAdminsHtml = "";
                let priorityCitys = obj.priorityCitys;
                if (priorityCitys) {
                    //推荐城市显示
                    priorityCitysHtml += "在中国以下城市有结果<ul>";
                    for (let i = 0; i < priorityCitys.length; i++) {
                        priorityCitysHtml += "<li>" + priorityCitys[i].name + "(" + priorityCitys[i].count + ")</li>";
                    }
                    priorityCitysHtml += "</ul>";
                }

                let allAdmins = obj.allAdmins;
                if (allAdmins) {
                    allAdminsHtml += "更多城市<ul>";
                    for (let i = 0; i < allAdmins.length; i++) {
                        allAdminsHtml += "<li>" + allAdmins[i].name + "(" + allAdmins[i].count + ")";
                        let childAdmins = allAdmins[i].childAdmins;
                        if (childAdmins) {
                            for (let m = 0; m < childAdmins.length; m++) {
                                allAdminsHtml += "<blockquote>" + childAdmins[m].name + "(" + childAdmins[m].count + ")</blockquote>";
                            }
                        }
                        allAdminsHtml += "</li>"
                    }
                    allAdminsHtml += "</ul>";
                }

            }
        },
        searchCity() {
            if (this.searchName == '') {
                this.$message('请输入要查询的地址');
                return;
            }
            this.localsearch.search(this.searchName.replace(/^\s+|\s+$/g, ""))
        },
        // 确定
        map_enter(bool) {
            let _this = this;
            _this.polygonTool.open()
            if (_this.polygonTool.getPolygons().length == 0) {
                this.$message('请标注一个区域');
            }
            _this.polygonTool.close();
            let grid_str = '';
            for (let i = 0; i < _this.overlays.length; i++) {
                grid_str += _this.overlays[i].lng + ',' + _this.overlays[i].lat + '-';
            }
            this.$emit("getLongLatArea", grid_str);
            this.isOpen = bool
        },
        clearPolyGon() {
            this.overlays = [];
            this.map.clearOverLays();
        },
        //区域标注开启
        polygonOpen() {
            let _this = this;
            //开启区域标注
            _this.polygonTool.open()
            if (_this.overlays.length > 0) {
                _this.polygonTool.close();
                this.$message('只能标注一个区域');
            }
        },
        //添加覆盖物/标记范围
        add_overlay() {
            var T = window.T;
            let _this = this;
            // 
            if (!this.pointData) return false;
            let pointDataArr = _this.pointData.split('-');
            let PolygonArray = [];
            for (let i = 0; i < pointDataArr.length; i++) {
                if (pointDataArr[i] != '') {
                    let lng_lat_array = pointDataArr[i].split(',');
                    PolygonArray.push(new T.LngLat(lng_lat_array[0], lng_lat_array[1]));
                }
            }
            _this.overlays = PolygonArray;
            let polygon = new T.Polygon(PolygonArray, {
                color: "blue",
                weight: 2,
                opacity: 0.5
            }); //创建多边形
            _this.map.addOverLay(polygon); //增加多边形
        }
    }
};
</script>
    
<style lang="scss" scoped>
.item_input {
    width: 200px;
    height: 24px;
}

#mapDiv {
    max-height: 800px;
}

.map_input {
    padding-bottom: 15px;
}
</style>
    