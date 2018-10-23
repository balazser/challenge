<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import IconPaw from './../assets/paw.jpeg'

@Component({})
export default class MyButton extends Vue {
  handleClick() {
    this.$emit('click')
  }
  render() {
    return (
      <button
        onClick={() => this.handleClick()}
        style="border: 1px solid black; padding: 5px 15px; border-radius: 10px"
      >
        <img src={IconPaw} style="width: 30px; margin-right: 10px" />
        <span>Adopt</span>
      </button>
    )
  }
}
</script>
