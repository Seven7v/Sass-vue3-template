<template>
  <div class="mod-homepage">
    <el-carousel trigger="click" class="banner" height="80px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <div class="banner-item">
          <a :href="item.url ? item.url : '#'" target="_blank">{{ t(`homePage.${item.value}`) }}</a>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="dashbord-data p20">
      <el-card class="box-card">
        <div class="card-item">
          <svg class="icon home-icon" aria-hidden="true">
            <use xlink:href="#icon-yonghuguanli"></use>
          </svg>
          <div class="card-value">
            <div class="card-label t-cen">{{ t('homePage.loginCount') }}</div>
            <div class="t-cen card-count mt10">{{ dashData.loginCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-item">
          <svg class="icon home-icon" aria-hidden="true">
            <use xlink:href="#icon-huashuguanli"></use>
          </svg>
          <div class="card-value">
            <div class="card-label t-cen">{{ t('homePage.messageCount') }}</div>
            <div class="t-cen card-count mt10">{{ dashData.messageCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-item">
          <svg class="icon home-icon" aria-hidden="true">
            <use xlink:href="#icon-zhihuifenxi"></use>
          </svg>
          <div class="card-value">
            <div class="card-label t-cen">{{ t('homePage.payCount') }}</div>
            <div class="t-cen card-count mt10">{{ dashData.payCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-item">
          <svg class="icon home-icon" aria-hidden="true">
            <use xlink:href="#icon-APIguanli"></use>
          </svg>
          <div class="card-value">
            <div class="card-label t-cen">{{ t('homePage.keyWord') }}</div>
            <div class="t-cen card-count mt10">{{ dashData.keyWord }}</div>
          </div>
        </div>
      </el-card>
    </div>
    <el-row style="margin-top: 50px">
      <el-col :span="24">
        <div ref="guageChart" :style="{ width: '100%', height: '700px' }"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { UserInfoRes } from '../../type'
import { reactive, ref, onMounted } from 'vue'
import { sendMessage, getDashBord } from '../../sever/data'
import * as echarts from 'echarts'
const { t } = useI18n()
let echart = echarts
const userInfo: UserInfoRes = JSON.parse(localStorage.getItem('userInfo'))

const bannerList = reactive([
  {
    id: 1,
    value: 'useV3TS'
  },
  {
    id: 2,
    value: 'sevice',
    url: 'https://github.com/Seven7v/node-admin'
  },
  {
    id: 3,
    value: 'url',
    url: 'https://github.com/Seven7v/vue3-Ts-admin'
  }
])
const dashData = ref({})
const guageChart = ref(null)
onMounted(() => {
  initChart()
})
const initChart = () => {
  let chart = echart.init(guageChart.value)
  let base = +new Date(1968, 9, 3)
  let oneDay = 24 * 3600 * 1000
  let date = []
  let data = [Math.random() * 300]
  for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay))
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
  }
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      }
    },
    grid: {
      left: '5%',
      right: '5%'
    },
    title: {
      left: 'center',
      text: 'Large Area Chart'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: '#ae86ff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#eeb3ce'
            },
            {
              offset: 1,
              color: '#ae86ff'
            }
          ])
        },
        data: data
      }
    ]
  })
  window.onresize = function () {
    //自适应大小
    chart.resize()
  }
}
const handleSendMessage = async () => {
  const message = {
    username: userInfo.username,
    message: '这里是测试一条消息提示',
    sendTime: new Date()
  }
  const res = await sendMessage(message)
}
const getData = async () => {
  // node-admin使用内容
  //   const res = await getDashBord()
  //   dashData.value = res.data.data
  dashData.value = {
    loginCount: Math.ceil(Math.random() * 1000),
    messageCount: Math.ceil(Math.random() * 5000),
    payCount: Math.ceil(Math.random() * 1000),
    keyWord: Math.ceil(Math.random() * 1000)
  }
}
// handleSendMessage()
getData()
</script>

<style lang="less">
.mod-homepage {
  .banner {
    width: 100%;
  }
  a {
    color: #fff;
  }
  .el-carousel__item .banner-item {
    width: 100%;
    text-align: center;
    color: #fbfcfc;
    opacity: 0.75;
    line-height: 80px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background: linear-gradient(to bottom right, rgb(112, 112, 249), rgb(14, 154, 205));
  }

  .el-carousel__item:nth-child(2n + 1) {
    background: linear-gradient(to bottom right, blue, pink);
  }
  .dashbord-data {
    display: flex;
    width: 100%;
    .box-card {
      width: 24%;
      margin-right: 1%;
    }
  }
  .home-icon {
    font-size: 60px;
  }
  .card {
    &-item {
      display: flex;
      align-items: center;
    }
    &-label {
      font-size: 12px;
      color: #b4b0b0;
    }
    &-value {
      width: 30px;
      flex: 1;
    }
    &-count {
      color: #333;
      font-weight: 700;
      font-size: 24px;
    }
  }
}
</style>
