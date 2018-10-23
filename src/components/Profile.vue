<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import MyButton from './MyButton.vue'
import paw from './../assets/paw.jpeg'

@Component({
  props: {
    id: String,
    name: String,
  },
})
export default class Profile extends Vue {
  hasAdopted = false

  handleClick() {
    this.hasAdopted = true
    this.$emit('adopted', this.id)
  }

  render() {
    return (
      <div>
        <img src={paw} style="margin-bottom: 15px" />
        <p>
          <strong>Name: </strong> {this.name}
        </p>
        <p>
          <strong>Has adopted: </strong> {this.hasAdopted ? 'yes' : 'no'}
        </p>
        <MyButton onClick={() => this.handleClick()} />
        <b-button>I am a Button</b-button>
      </div>
    )
  }
}
</script>
