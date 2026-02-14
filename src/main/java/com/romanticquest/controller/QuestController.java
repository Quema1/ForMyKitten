package com.romanticquest.controller;

import com.romanticquest.model.QuestProgress;
import com.romanticquest.service.QuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/quest")
@SessionAttributes("questProgress")
public class QuestController {

    @Autowired
    private QuestProgress questProgress;

    @Autowired
    private QuestService questService;

    @ModelAttribute("questProgress")
    public QuestProgress getQuestProgress() {
        return questProgress;
    }

    @GetMapping("/bitwise")
    public String bitwisePuzzle() {
        if (!questProgress.isJourneyStarted()) {
            return "redirect:/";
        }
        return "quest-bitwise";
    }

    @PostMapping("/bitwise")
    public String validateBitwise() {
        if (!questProgress.isJourneyStarted()) {
            return "redirect:/";
        }
        questProgress.setBitwisePuzzleCompleted(true);
        return "redirect:/quest/base64";
    }

    @GetMapping("/base64")
    public String base64Puzzle(Model model) {
        if (!questProgress.isJourneyStarted() || !questProgress.isBitwisePuzzleCompleted()) {
            return "redirect:/";
        }
        String binaryMessage = questService.getBinaryEncodedMessage();
        model.addAttribute("binaryMessage", binaryMessage);
        return "quest-base64";
    }

    @PostMapping("/base64")
    public String validateBase64(@RequestParam("answer") String answer,
                                  RedirectAttributes redirectAttributes) {
        if (!questProgress.isJourneyStarted() || !questProgress.isBitwisePuzzleCompleted()) {
            return "redirect:/";
        }
        if (questService.validateBinaryAnswer(answer)) {
            questProgress.setBase64PuzzleCompleted(true);
            return "redirect:/quest/ascii";
        } else {
            redirectAttributes.addFlashAttribute("error", "Incorrect answer! Try again.");
            redirectAttributes.addFlashAttribute("binaryMessage", questService.getBinaryEncodedMessage());
            return "redirect:/quest/base64";
        }
    }

    @GetMapping("/ascii")
    public String asciiPuzzle() {
        if (!questProgress.isJourneyStarted() || !questProgress.isBitwisePuzzleCompleted()
                || !questProgress.isBase64PuzzleCompleted()) {
            return "redirect:/";
        }
        return "quest-ascii";
    }

    @PostMapping("/ascii")
    public String validateAscii() {
        if (!questProgress.isJourneyStarted() || !questProgress.isBitwisePuzzleCompleted()
                || !questProgress.isBase64PuzzleCompleted()) {
            return "redirect:/";
        }
        questProgress.setAsciiPuzzleCompleted(true);
        return "redirect:/quest/api-connect";
    }

    @GetMapping("/api-connect")
    public String apiConnectPuzzle() {
        if (!questProgress.isJourneyStarted() || !questProgress.isBitwisePuzzleCompleted()
                || !questProgress.isBase64PuzzleCompleted() || !questProgress.isAsciiPuzzleCompleted()) {
            return "redirect:/";
        }
        return "quest-api";
    }

    @PostMapping("/api-connect")
    public String validateApiConnect() {
        if (!questProgress.isJourneyStarted() || !questProgress.isBitwisePuzzleCompleted()
                || !questProgress.isBase64PuzzleCompleted() || !questProgress.isAsciiPuzzleCompleted()) {
            return "redirect:/";
        }
        questProgress.setApiPuzzleCompleted(true);
        return "redirect:/quest/api-connect";
    }
}
