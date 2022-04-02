// mock数据模拟
import Mock from 'mockjs'

// 折线图数据
let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '小米',
            value: 2974
          },
          {
            name: '苹果',
            value: 5912
          },
          {
            name: 'vivo',
            value: 1578
          },
          {
            name: 'oppo',
            value: 1957
          },
          {
            name: '魅族',
            value: 1201
          },
          {
            name: '华为',
            value: 4989
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],
        // 折线图
        orderData: {
          date: ['20220301', '20220302', '20220303', '20220304', '20220305', '20220306', '20220307'],
          data: List
        },
        // 表格数据
        tableData: [
          {
            name: 'oppo',
            todayBuy: 344,
            monthBuy: 3542,
            totalBuy: 22396
          },
          {
            name: 'vivo',
            todayBuy: 325,
            monthBuy: 2267,
            totalBuy: 24453
          },
          {
            name: '苹果',
            todayBuy: 876,
            monthBuy: 4508,
            totalBuy: 65778
          },
          {
            name: '小米',
            todayBuy: 833,
            monthBuy: 3574,
            totalBuy: 45264
          },
          {
            name: '华为',
            todayBuy: 873,
            monthBuy: 4777,
            totalBuy: 54764
          },
          {
            name: '魅族',
            todayBuy: 322,
            monthBuy: 2103,
            totalBuy: 22546
          }
        ]
      }
    }
  }
}
