const data = [
    {Timestamp: '2021-09-30T21:38:46.7000122Z',Value: '496',},
    {Timestamp: '2021-10-01T01:08:47.4690093Z',Value: '496',},
    {Timestamp: '2021-10-02T15:38:02.5080108Z',Value: '207',},
    {Timestamp: '2021-10-02T16:30:32.3410034Z',Value: '207',},
    {Timestamp: '2021-10-02T21:45:32.7460021Z',Value: '207',},
    {Timestamp: '2021-10-02T22:38:02.5839996Z',Value: '413',},
    {Timestamp: '2021-10-02T23:30:33.3980102Z',Value: '413',},
    {Timestamp: '2021-10-03T00:23:02.7130126Z',Value: '413',},
    {Timestamp: '2021-10-03T11:47:47.8630065Z',Value: '413'}
]

var i = 0;
const result = Object
  .values(
    data.reduce((a, { Value, Timestamp }) => {
      a[Value] = a[Value] || {
        id: +Value,
        stTime: Timestamp,
      }
      a[Value].endTime = Timestamp
      i ++;
      console.log(Value)
      console.log(Timestamp)
      console.log(a)
      console.log('----------------i::' + i)
      return a
    }, {})
  )

//console.log(result)

const services = [
    {
        id: 5,
        service_name: 'Green Car',
        region_id: 1,
        region_name: 'Ha Noi' 
    },
    {
        id: 6,
        service_name: 'Green Luxury',
        region_id: 1,
        region_name: 'Ha Noi' 
    },
    {
        id: 7,
        service_name: 'Green Car',
        region_id: 2,
        region_name: 'HCM' 
    },
    {
        id: 8,
        service_name: 'Green Luxury',
        region_id: 2,
        region_name: 'HCM' 
    },
    {
        id: 9,
        service_name: 'Green Car Airport',
        region_id: 1,
        region_name: 'Ha Noi' 
    }
]

const regionService = services.reduce((ojb, item) => {
    if (!ojb[item.region_id]) {
        ojb[item.region_id] = [
            {
                id: item.id,
                service_name: item.service_name + '-' + item.region_name
            }
        ]
    }else {
        ojb[item.region_id].push({
            id: item.id,
            service_name: item.service_name + '-' + item.region_name
        })
    }
    return ojb;
}, {})

console.log(regionService)

const regionId = {
    HN: 1,
    HCM: 2
}

console.log(regionService[regionId.HCM])