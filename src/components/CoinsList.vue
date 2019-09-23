<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <section class="table-wrap">
            <div v-if="loading" key="initial-loading">Loading...</div>
            <table v-else key="initial-loading" class="table">
                <thead>
                    <tr class="table__row table__row--thead">
                        <th class="table__col"></th>
                        <th class="table__col">Coin</th>
                        <th class="table__col">Price</th>
                        <th class="table__col">Mkt. Cap.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table__row table__row--tbody" 
                        v-for="(item, i) in list" 
                        :key="item.CoinInfo.id"
                    >
                        <td class="table__col" nowrap>{{ i + 1 }}</td>
                        <td class="table__col" nowrap>
                            <img class="table__image" 
                                :src="origin + item.CoinInfo.ImageUrl" 
                                width="28" 
                                height="28" 
                            />
                            <span>{{ item.CoinInfo.FullName }} ({{ item.CoinInfo.Name }})</span>
                        </td>
                        <td class="table__col" nowrap>{{ item.DISPLAY.USD.PRICE }}</td>
                        <td class="table__col" nowrap>{{ item.DISPLAY.USD.MKTCAP }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            timer: null,
            origin: 'https://www.cryptocompare.com',
            list: [],
            page: 0
        }
    },
    created() {
        this.loadList().then((list) => {
            this.list = this.sortListByPrice(list);
            this.loading = false;
        });
        this.startAutoUpdate();
    },
    destroyed() {
        clearTimeout(this.timer);
    },
    methods: {
        sortListByPrice(list) {
            return list.sort((a, b) => {
                let aPrice = parseFloat(a.DISPLAY.USD.PRICE.substr(1).replace(',', ''));
                let bPrice = parseFloat(b.DISPLAY.USD.PRICE.substr(1).replace(',', ''));
                return bPrice - aPrice;
            });
        },
        startAutoUpdate() {
            const update = () => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.loadList().then((list) => {
                        // replace old top100 with new top100
                        // and sort new top100 by price
                        this.list.splice(0, 100);
                        this.list.splice(0, 0, ...this.sortListByPrice(list));
                        update();
                    });
                }, 3000);
            };
            update();
        },
        loadList(limit=100, page=0) {
            return this.$http.get('/data/top/mktcapfull', {
                params: {
                    limit,
                    page,
                    tsym: 'USD'
                }
            }).then(({ data }) => {
                if (data.Response && data.Response.toLowerCase() === 'error') {
                    throw('Ошибка HTTP запроса!');
                }
                return data.Data;
            }).catch(alert);
        },
        loadMore() {
            this.page++;
            this.loadList(10, this.page).then((list) => { 
                let arr = [];
                arr.push(...this.list, ...list);
                this.list = arr;
            });
        }
    }
}
</script>

<style scoped>
    .table-wrap {
        overflow-x: auto;
    }

    .table {
        width: 100%;
        text-align: left;
        font: normal 1.2em monospace;
        display: block;
    }

    .table__row {
        border-bottom: 1px solid #eee;
    }

    .table__row--thead {
        border-color: rgba(66, 185, 131, 1);
        font-weight: bold;
    }

    .table__row--tbody:hover {
        background: rgba(66, 185, 131, .1);
    }

    .table__col {
        padding: 5px;
        vertical-align: middle;
    }

    .table__image {
        display: inline-block;
        vertical-align: middle;
        margin-right: 20px;
    }
</style>
