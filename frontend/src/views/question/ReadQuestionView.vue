<template>
  <div>
    <div class="bg-base-300 rounded-2xl lg:w-3/5 mt-10 pb-10 mx-auto">
      <div>
        <!-- câu hỏi -->
        <vQuestionVue />
        <!-- câu trả lời -->
        <div class="w-4/5 mx-auto">
          <div class="text-4xl my-5">Câu trả lời</div>
          <div v-if="useQuestion.question.answer">
            <vCmtQuestion
              @selectAnswer="removeAnswer"
              type="answer"
              :data="useQuestion.question.answer"
              :answer="useQuestion.question.answer ? true : false"
            />
          </div>
          <div v-else class="my-5">chưa có đáp án cho câu hỏi này</div>
        </div>

        <!-- vote của question-->
        <div class="lg:text-2xl text-base flex justify-evenly border-b-4 border-black">
          <div class="p-3 flex items-center justify-center">
            <i class="fa-solid fa-comments pt-1"></i>
            <p class="mx-2">{{ useQuestion.question.comment_Question.length || 0 }}</p>
          </div>
          <div class="p-3 flex items-center justify-center">
            <i class="fa-solid fa-eye pt-1"></i>
            <div class="mx-2">
              {{ useQuestion.question.voted.view || 0 }}
            </div>
          </div>
        </div>
        <!-- danh sách cmt -->
        <div class="w-4/5 mx-auto">
          <!-- input cmt của bài question -->
          <div>
            <div class="text-4xl py-5">Nhập Câu trả lời</div>
            <vInputCmtVue :reset="resetInput" :data="dataInput" />
            <!-- btn gửi -->
            <div>
              <div v-if="!loading" @click="send()" class="btn btn-outline btn-info my-3">
                <i class="fa-solid fa-paper-plane"></i>
                <div class="p-3">Gửi</div>
              </div>
              <div v-if="loading" class="loading btn btn-outline btn-info my-3">
                <div class="p-3">Gửi</div>
              </div>
            </div>
          </div>
          <!-- cmt question -->
          <div :key="cmt.id" v-for="cmt in useQuestion.question.comment_Question">
            <vCmtQuestion
              @selectAnswer="selectAnswer"
              @rep="openInput"
              :data="cmt"
              :answer="useQuestion.question.answer ? true : false"
            />
            <!-- input rep -->
            <div class="ml-16" v-if="isOpenInput == cmt.id">
              <vInputCmtVue :reset="resetInput" :data="dataInput" />
              <!-- btn gửi -->
              <div>
                <div
                  v-if="!loadingChild"
                  @click="sendchild(cmt.id)"
                  class="btn btn-outline btn-info my-3"
                >
                  <i class="fa-solid fa-paper-plane"></i>
                  <div class="p-3">Gửi</div>
                </div>
                <div v-if="loadingChild" class="loading btn btn-outline btn-info my-3">
                  <div class="p-3">Gửi</div>
                </div>
              </div>
            </div>
            <!-- list cmt child -->
            <div class="ml-16" :key="child.id" v-for="child in cmt.cmt_child">
              <vCmtQuestion
                @selectAnswer="selectAnswer"
                type="child"
                :data="child"
                :answer="useQuestion.question.answer ? true : false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vQuestionVue from "../../components/question/vQuestion.vue";
import vCmtQuestion from "../../components/question/vCmtQuestion.vue";
import vInputCmtVue from "../../components/Comment/vInputCmt.vue";
import { ref } from "vue";
import { infoStore } from "../../stores/info.store";
import { alertStore } from "../../stores/alert.store";
import { questStore } from "../../stores/question.store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const useQuestion = questStore();
const useInfo = infoStore();
const useAlert = alertStore();
const resetInput = ref(0);
const dataInput = ref({
  content: {},
  tagname: [],
});

const isOpenInput = ref("");

const loading = ref(false);
const loadingChild = ref(false);

async function selectAnswer(answer, author) {
  const id = useQuestion.question.id;
  const data = {
    answer: answer,
    author: author,
  };
  try {
    await useQuestion.selectAnswer(id, data);
    await useQuestion.findOneQuestion(id);
    useAlert.setSuccess("đã chọn câu trả lời");
  } catch (error) {
    console.log("lỗi selectAnswer");
    console.log(error);
    useAlert.setError("có lỗi khi chọn câu trả lời");
  }
}

async function removeAnswer(answer, author) {
  const id = useQuestion.question.id;
  const data = {
    answer: answer,
    author: author,
  };
  console.log(id);
  console.log(data);
  try {
    await useQuestion.removeAnswer(id, data);
    await useQuestion.findOneQuestion(route.params.id);
    useAlert.setSuccess("đã xóa câu trả lời");
  } catch (error) {
    console.log("lỗi selectAnswer");
    console.log(error);
    useAlert.setError("có lỗi khi chọn câu trả lời");
  }
}

function openInput(id) {
  if (isOpenInput.value == id) {
    isOpenInput.value = "";
  } else isOpenInput.value = id;
}

async function send() {
  loading.value = true;
  let list = [];
  dataInput.value.tagname.forEach((e) => {
    list.push(e.id);
  });
  const data = {
    author: useInfo.info.id,
    id_Question: useQuestion.question.id,
    content: dataInput.value.content,
    listTagName: list,
  };

  try {
    if (
      data.content.ops.length > 1 ||
      typeof data.content.ops[0].insert != "string" ||
      data.content.ops[0].insert.trim() != "" ||
      data.listTagName.length
    ) {
      await useQuestion.createCommentQuestion(data);
      useQuestion.findOneQuestion(route.params.id);
      dataInput.value.content = { ops: [{ insert: "\n" }] };
      dataInput.value.tagname = [];
      resetInput.value++;
      useAlert.setSuccess("đã gửi bình luận");
    }
  } catch (error) {
    useAlert.setError("có lỗi");
    console.log("lỗi gửi cmt");
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function sendchild(id) {
  loadingChild.value = true;
  let list = [];
  dataInput.value.tagname.forEach((e) => {
    list.push(e.id);
  });
  const data = {
    author: useInfo.info.id,
    content: dataInput.value.content,
    listTagName: list,
  };

  try {
    if (
      data.content.ops.length > 1 ||
      typeof data.content.ops[0].insert != "string" ||
      data.content.ops[0].insert.trim() != "" ||
      data.listTagName.length
    ) {
      await useQuestion.createCommentChild(data, id);
      useQuestion.findOneQuestion(useQuestion.question.id);
      dataInput.value.content = { ops: [{ insert: "\n" }] };
      dataInput.value.tagname = [];
      resetInput.value++;
      useAlert.setSuccess("đã gửi phản hồi");
    }
  } catch (error) {
    useAlert.setError("có lỗi");
    console.log("lỗi gửi cmt con");
    console.log(error);
  } finally {
    loadingChild.value = "";
  }
}
</script>

<style></style>
