<script>
import _ from 'lodash'

export default {
  methods: {
    getRoute: function (route) {
      return _.isString(route)
        ? { name: route }
        : route
    }
  }
}
</script>
